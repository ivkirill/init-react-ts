export type EnumType = { [s: number]: string };

export function mapEnum(enumerable: EnumType): string[] {
  const values: string[] = [];

  Object.keys(enumerable).forEach((value: any) => {
    const key = enumerable[value];

    if (typeof key === 'string') {
      return values.push(key);
    }

    return false;
  });

  return values;
}
