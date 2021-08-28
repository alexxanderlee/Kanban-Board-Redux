const isEmptyStr = (str: string): boolean => (str ? (str.trim() === '') : true);

export const validators = {
  required: (value: string) => (!isEmptyStr(value) ? undefined : 'Required'),
};