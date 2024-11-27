export type ToastLevel = 'info' | 'error';

export type ToastMessage = {
    level: ToastLevel,
    message: string,
    expire: number,
}
