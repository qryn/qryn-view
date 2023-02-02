
// Labels extraction from series

export interface LabelSeries {
    labelSeries: string[];
    loading: boolean;
}

export type UseLabelSeriesFn = (
    dataSourceId: string,
    label: string
) => LabelSeries;

export interface SeriesResponse {
    status: string;
    data: Object[];
}

// Operator Builders 

// props 

interface CommonFormatProps {
    result: string;
    build(initial: string): string;
}

export interface JSONBuilderProps extends CommonFormatProps {
    expressions: string[];
    expressionsString: string;
    setJSON(initial: string): string;
    addExpression(expression: string): void;
    setExpressions(): void;
}

export interface LabelRangeProps {
    result: string;
    range: string;
    labels: string[];
    labelsString: string;
    setFn(initial: string): void;
    updRange(range: string): void;
    setRange(): void;
    addLabel(label: string): void;
    setLabels(): void;
    build(initial: string): string;
}

export interface RangeBuilderProps {
    result: string;
    range: string;
    setFn(initial: string): void;
    setRange(range: string): void;
    setRate(): void;
    build(initial: string): string;
}

export interface LineFmtBuilderProps {
    result: string;
    expression: string;
    setLine(intial: string): void;
    setText(): void;
    setExpression(expression: string): void;
    build(initial: string, expression: string): string;
}

export interface PatternFmtBuilderProps {
    result: string;
    expression: string;
    setPattern(intial: string): void;
    setExpression(expression: string): void;
    setText(): void;
    build(initial: string, expression: string): string;
}

export interface RegexFmtBuilderProps {
    result: string;
    expression: string;
    setRegex(intial: string): void;
    setExpression(expression: string): void;
    setText(): void;
    build(initial: string): string;
}

export interface LogFmtBuilderProps extends CommonFormatProps {
    setLogFmt(): string;
}

export interface UnPackBuilderProps extends CommonFormatProps {
    setUnPack(): string;
}

export interface UnwrapBuilderProps extends CommonFormatProps {
    setUnwrapFmt(): string;
}


// Functions

export type JSONBuilderFn = () => JSONBuilderProps;

export type LabelRangeFn = (rangeType: LabelRangeOperator) => LabelRangeProps;

export type RangeFn = (rangeType: SimpleRangeOperator) => RangeBuilderProps;

export type LineFmtFn = () => LineFmtBuilderProps;

export type PatternFmtFn = () => PatternFmtBuilderProps;

export type RegexFmtFn = () => RegexFmtBuilderProps;

export type UnPackFn = () => UnPackBuilderProps;

export type UnwrapFmtFn = () => UnwrapBuilderProps;

export type LogFmtFn = () => LogFmtBuilderProps;

// Range types

export type SimpleRangeOperator =
    | "rate"
    | "rate_counter"
    | "count_over_time"
    | "sum_over_time"
    | "bytes_rate"
    | "bytes_over_time"
    | "absent_over_time";

export type LabelRangeOperator =
    | "avg_over_time"
    | "min_over_time"
    | "max_over_time"
    | "first_over_time"
    | "last_over_time"
    | "stdvar_over_time"
    | "stddev_over_time";

export type QuantileRangeOperator = "quantile_over_time";



