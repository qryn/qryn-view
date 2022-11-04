import { useDispatch, useSelector } from "react-redux";
import { setLeftPanel } from "../../actions/setLeftPanel";
import { setRightPanel } from "../../actions/setRightPanel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
    CloseQuery,
    InputGroup,
    Label,
    OpenQuery,
    QueryItemToolbarStyled,
    ShowQueryButton,
} from "./style";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMemo, useState } from "react";
import { themes } from "../../theme/themes";

const DataSourceSelect = (props) => {
    const { value, onChange, opts, label } = props;

    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);

    return (
        <InputGroup>
            {label?.length > 0 && <Label>{label}</Label>}
            <select defaultValue={value.toLowerCase()} onChange={onChange}>
                {formattedSelect?.map((field, key) => (
                    <option key={key} value={field.value}>
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
};

function QueryId(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [idText, setIdText] = useState(props.data.idRef);
    const storeTheme = useSelector(({ theme }) => theme);
    const theme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);
    function onIdTextChange(e) {
        e.preventDefault();
        const txt = e.target.value;
        setIdText(txt);
    }

    function closeInput(e) {
        props.onIdRefUpdate(idText);
        setIsEditing(false);
    }

    function handleKeydown(e) {
        if (e.key === "Enter") {
            props.onIdRefUpdate(idText);
            setIsEditing(false);
        }
    }

    if (isEditing === true) {
        return (
            <>
                <input
                    style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: theme.textColor,
                    }}
                    value={idText}
                    placeholder={idText}
                    onChange={onIdTextChange}
                    onKeyDown={handleKeydown}
                    onBlur={closeInput}
                />
            </>
        );
    } else {
        return (
            <>
                <p className="query-id" onClick={(e) => setIsEditing(true)}>
                    {idText}
                </p>
            </>
        );
    }
}

export function QueryItemToolbar(props) {
    const dispatch = useDispatch();
    // update panel on id change
    const {
        data: { expr },
    } = props;
    const {dataSourceType} = props.data
    const panel = useSelector((store) => store[props.name]);
    const isEmbed = useSelector((store) => store.isEmbed);
    const dataSources = useSelector((store) => store.dataSources);

    const panelAction = (panel, data) => {
        if (panel === "left") {
            return setLeftPanel(data);
        } else {
            return setRightPanel(data);
        }
    };

    function onIdRefUpdate(e) {
        const cPanel = [...panel];
        cPanel.forEach((panel) => {
            if (panel.id === props.data.id) {
                panel.idRef = e;
            }
        });

        dispatch(panelAction(props.name, cPanel));
    }
    const onDataSourceChange = (e) => {
        // load labels
        // load values
        // load logs ?

        const value = e.target.value;
        const panelCP = JSON.parse(JSON.stringify(panel));
        panelCP.forEach((panelCP) => {
            if (panelCP.id === props.data.id) {
                panelCP.dataSourceType = value;
            }
        });
        console.log(props.name, panelCP)
        dispatch(panelAction(props.name, panelCP));
    };
    return (
        <QueryItemToolbarStyled>
            <div className="query-title">
                {!isEmbed && (
                    <ShowQueryButton
                        onClick={() => {
                            props.isQueryOpen[1](
                                props.isQueryOpen[0] ? false : true
                            );
                        }}
                    >
                        {props.isQueryOpen[0] ? <OpenQuery /> : <CloseQuery />}
                    </ShowQueryButton>
                )}

                <QueryId onIdRefUpdate={onIdRefUpdate} {...props} />
                {isEmbed && (
                    <p style={{ marginLeft: "20px", fontFamily: "monospace" }}>
                        {expr}
                    </p>
                )}
            </div>
            {!isEmbed && (
                <div className="query-tools">
                    <DataSourceSelect
                        value={dataSourceType}
                        onChange={onDataSourceChange}
                        opts={dataSources}
                        label={""}
                    />
                    <AddOutlinedIcon
                        style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "3px",
                        }}
                        onClick={props.onAddQuery}
                    />
                    <DeleteOutlineIcon
                        style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            padding: "3px",
                        }}
                        onClick={props.onDeleteQuery}
                    />
                </div>
            )}
        </QueryItemToolbarStyled>
    );
}
