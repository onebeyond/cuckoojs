interface NestedObject {
  [key: string]: NestedObject | number | string | boolean | null | undefined;
}

export default function sortObjectKeys(o: NestedObject): NestedObject {
  return Object(o) !== o || Array.isArray(o)
    ? o
    : Object.keys(o)
        .sort()
        .reduce(
          (a, k) => ({ ...a, [k]: sortObjectKeys(o[k] as NestedObject) }),
          {},
        );
}
