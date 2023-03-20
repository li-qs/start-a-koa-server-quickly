export function response(code: number, data: any, message: string) {
    return { code, data, message }
}

export function successful() {
    return response(0, null, 'successful')
}

export function failed() {
    return response(1, null, 'failed')
}
