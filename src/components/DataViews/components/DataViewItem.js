import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useActualQuery, useTableHeight, useViewHeight } from "../hooks";
import { EmptyView } from "../views/EmptyView";
import LogsView from "../views/LogsView";
import { MatrixView } from "../views/MatrixView";
import { VectorView } from "../views/VectorView";
import {TraceView} from "./Traces/TraceView.jsx"
export function DataViewItem(props) {
    // add a header for table view / json view

    const { dataView, name, vHeight } = props;
    const { type, total } = dataView;

    const viewRef = useRef(null);
    const isSplit = useSelector((store) => store.isSplit);
    const panel = useSelector((store) => store[name]);
        // panelSize: min , regular, max
    const [panelSize, setPanelSize] = useState("max");
    // get actual query from panel
    const actualQuery = useActualQuery({ panel, dataView });

    const [viewWidth, setViewWidth] = useState(0);

    useEffect(() => {
        if (viewRef?.current?.clientWidth) {
            setViewWidth(viewRef.current.clientWidth);
        }
    }, [viewRef?.current?.clientWidth]);

    const [streamData, setStreamData] = useState(dataView.data); //
    const [tableData, setTableData] = useState(dataView.tableData || {});

    useEffect(() => {
        setStreamData(dataView.data);
    }, [dataView.data, setStreamData, isSplit]);

    useEffect(() => {
        setTableData(dataView.tableData || {});
    }, [dataView.tableData, setTableData]);

    const onStreamClose = () => {
        setStreamData([]);
        setTableData([]);
    };

    const onMinimize = () => {
        setPanelSize((prev) => (prev !== "min" ? "min" : "regular"));
    };

    const onMaximize = () => {
        setPanelSize((prev) => (prev !== "max" ? "max" : "regular"));
    };



    const theight = useTableHeight({ total, panelSize, dataView });

    const viewHeight = useViewHeight({ type, actualQuery, total, dataView});
    if (true || (actualQuery && type === "matrix" && streamData.length > 0)) {
        // return matrix type component
        const { limit } = actualQuery;
        const matrixProps = {
            viewRef,
            panelSize,
            viewHeight,
            onStreamClose,
            onMaximize,
            onMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            viewWidth,
            limit,
            streamData,
            ...props,
        };
        return <TraceView {...matrixProps}/>;
    }

    if (actualQuery && type === "matrix" && streamData.length > 0) {
        // return matrix type component
        const { limit } = actualQuery;
        const matrixProps = {
            viewRef,
            panelSize,
            viewHeight,
            onStreamClose,
            onMaximize,
            onMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            viewWidth,
            limit,
            streamData,
            ...props,
        };
        return <MatrixView {...matrixProps}/>;
    }

    if (actualQuery && type === "stream" && streamData.length > 0) {
        const logsProps = {
            viewRef,
            panelSize,
            viewHeight,
            onStreamClose,
            onMaximize,
            onMinimize,
            actualQuery,
            total,
            type,
            theight,
            tableData,
            streamData,
            ...props,
        };

        return <LogsView {...logsProps} />;
    }

    if (actualQuery && type === "vector" && streamData?.dataRows?.length > 0) {
        // return vector type (table) component
        const vectorProps = {
            viewRef,
            panelSize,
            viewHeight,
            onStreamClose,
            onMinimize,
            onMaximize,
            actualQuery,
            total,
            type,
            theight,
            streamData,
            ...props,
        };
        return <VectorView {...vectorProps} />;
    } else {
        // Empty view for the case when no view available
        const emptyViewProps = {
            viewRef,
            panelSize,
            onStreamClose,
            onMinimize,
            onMaximize,
            actualQuery,
            total,
            ...props,
        };

        return <EmptyView {...emptyViewProps} />;
    }
}
