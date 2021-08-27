export const isEmptyStr = (str: string): boolean => (str ? (str.trim() === '') : true);

export const required = (value: string) => (!isEmptyStr(value) ? undefined : 'Required');