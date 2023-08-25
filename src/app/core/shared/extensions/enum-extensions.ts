export const enumExtensions = {
  getEnumValues(enu: any, valueType: 'string' | null = null): any[] {
    const values = Object.values(enu);
    return valueType === 'string'
      ? values
      : values.filter((value) => typeof value !== 'string');
  },
  getEnumKeys(enu: any) {
    for (let enumMember in enu) {
      let isValueProperty = Number(enumMember) >= 0;
      if (isValueProperty) {
      }
    }
  },

  enumToList<T>(
    source: T,
    idType?: 'string' | 'number'
  ): { key: string | number; value: any }[] {
    if (idType === 'string')
      return Object.keys(source).map((key) => ({
        key: source[key],
        value: key,
      }));

    return Object.keys(source)
      .filter((x) => parseInt(x) >= 0)
      .map((key) => ({
        key: Number(key),
        value: source[key],
      }));
  },
};
