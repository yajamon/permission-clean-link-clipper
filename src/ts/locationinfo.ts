export interface MessageScheme {
    key: string;
    value: any
}
export interface LatestLocationMessage extends MessageScheme{
    key: "latestLocation";
    value: undefined;
}
export interface LocationInfo {
    title: string | undefined;
    url: string | undefined;
}
