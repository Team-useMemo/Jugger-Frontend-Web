export const setStorageItem = (key: string, value: any) => {
  // console.log(JSON.stringify(null));
  // console.log(JSON.parse(JSON.stringify(null)));
  // console.log(JSON.stringify(undefined));
  // console.log(JSON.parse(JSON.stringify(undefined)));

  console.log(
    재귀({
      null: null,
      undefined: undefined,
    }),
  );

  localStorage.setItem(key, value);

  // console.log(new Date() instanceof Date);
};

const 재귀 = (value: any) => {
  if (value === undefined)
    return {
      _type: 'undefined',
    };
  if (value === null) return { _type: 'null', _value: null };
  if (typeof value === 'object')
    return {
      _type: 'object',
      _value: Object.entries(value).map((e: any): any => {
        return [e[0], 재귀(e[1])];
      }),
    };
};

export default 재귀;
