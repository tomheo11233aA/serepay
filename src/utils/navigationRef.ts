import React from "react";

export const navigationRef = React.createRef<any>()

export function navigate(name: string, params?: object) {
    navigationRef.current?.navigate(name, params);
}

export function goBack() {
    navigationRef.current?.goBack();
}

export function push(name: string, params: object) {
    navigationRef.current?.push(name, params);
}

export function replace(name: string, params: object) {
    navigationRef.current?.replace(name, params);
}

export function reset(index: number, name: string) {
    navigationRef.current?.reset({
        index,
        routes: [{ name }],
    });
}

export function pop(count: number) {
    navigationRef.current?.pop(count);
}