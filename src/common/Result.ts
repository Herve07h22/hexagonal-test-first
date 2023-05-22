
export type Result<T> = { status: "ok"; value: T; } | { status: "error"; error: string; };
