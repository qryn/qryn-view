import styled from '@emotion/styled'

export const TableStyles = styled.div`
    padding: 1rem;

    .table {
        border-spacing: 0;
        border: 1px solid ${props => props.theme.buttonBorder};
        border-radius:4px;
        font-size: 12px;
        color: ${props => props.theme.textColor};

        .tr {
            display: flex;
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }
        .th {
                :last-child {
                    box-sizing: unset !important;
                }
            }
        .th,
        .td {
            display: flex;
            flex: 1;
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid ${props => props.theme.buttonBorder};
            border-right: 1px solid ${props => props.theme.buttonBorder};

            ${"" /* In this example we use an absolutely position resizer,
     so this is required. */}
            position: relative;

            :last-child {
                border-right: 0;
                padding-right: 0px;
            }
        
            .resizer {
                display: inline-block;
                background: ${props => props.theme.buttonBorder};
                width: 1px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(50%);
                z-index: 1;
                ${"" /* prevents from scrolling while dragging on touch devices */}
                touch-action:none;

                &.isResizing {
                    background: blue;
                }
            }
        }
    }
    .pagination {
        padding: 0.5rem;
    }
`;

export const getStyles = (props, align = "left") => [
    props,
    {
        style: {
            justifyContent: align === "right" ? "flex-end" : "flex-start",
            alignItems: "flex-start",
            display: "flex",
        },
    },
];