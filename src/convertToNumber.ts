type Join<K, P> = P extends "" ? `${K}` : `${K}.${P}`;

type Path<
  T,
  IncludeArray extends boolean = true,
  Depth extends number[] = [],
> = Depth["length"] extends 5
  ? ""
  : T extends object
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends Array<infer U>
            ? IncludeArray extends true
              ?
                  | Join<K, Path<U, false, [...Depth, 0]>>
                  | `${K}.[].${Path<U, true, [...Depth, 0]>}`
                  | K
              : never
            : Join<K, Path<T[K], true, [...Depth, 0]>>
          : never;
      }[keyof T]
    : "";

type PathsOf<T> = Path<T>;

type MatchPath<
  P1 extends string,
  P2 extends string,
> = P1 extends `${infer Start}.[]${infer Rest}`
  ? P2 extends `${Start}.[${string}]${Rest}`
    ? true
    : false
  : P1 extends P2
    ? true
    : false;

type ConvertToNumberType<
  V,
  T = number,
  IncludePaths extends PathsOf<V>[] | undefined = undefined,
  CurrentPath extends string = "",
> =
  V extends Array<infer U>
    ? Array<
        ConvertToNumberType<U, T, IncludePaths, `${CurrentPath}.[${number}]`>
      >
    : V extends object
      ? {
          [K in keyof V]: K extends string
            ? CurrentPath extends ""
              ? ConvertToNumberType<V[K], T, IncludePaths, `${K}`>
              : IncludePaths extends PathsOf<V>[]
                ? IncludePaths[number] extends string
                  ? MatchPath<IncludePaths[number], CurrentPath> extends true
                    ? V[K] extends string | number
                      ? number | T
                      : V[K]
                    : V[K]
                  : V[K]
                : V[K]
            : never;
        }
      : IncludePaths extends PathsOf<V>[]
        ? IncludePaths[number] extends string
          ? MatchPath<IncludePaths[number], CurrentPath> extends true
            ? V extends string | number
              ? number | T
              : V
            : V
          : V
        : V extends string | number
          ? number | T
          : V;

function convertToNumber<V, T = number>(
  value: V,
  fallback?: T,
  opts?: { include?: PathsOf<V>[]; exclude?: PathsOf<V>[] },
): ConvertToNumberType<V, T, typeof opts.include> {
  const fallbackValue = (arguments.length < 2 ? 0 : fallback) as number | T;

  const shouldInclude = (key: string) =>
    !opts?.include ||
    opts.include.some((path) => {
      const normalizedPath = path.replace(/\[\]/g, "[0]");
      return key.startsWith(normalizedPath);
    });

  const shouldExclude = (key: string) =>
    opts?.exclude?.some((path) => {
      const normalizedPath = path.replace(/\[\]/g, "[0]");
      return key.startsWith(normalizedPath);
    }) ?? false;

  const processValue = (key: string, val: any): any => {
    if (shouldExclude(key)) return val;
    if (!shouldInclude(key)) return val;

    return convertValue(key, val);
  };

  function convertValue<V>(key: string, val: V): ConvertToNumberType<V> {
    if (typeof val === "number") {
      return isNaN(val) ? fallbackValue : (val as ConvertToNumberType<V>);
    }

    if (typeof val === "string") {
      const trimmedValue = val.trim();
      const parsedValue = Number(trimmedValue);
      if (!trimmedValue || isNaN(parsedValue)) {
        return fallbackValue as ConvertToNumberType<V>;
      }
      return parsedValue as ConvertToNumberType<V>;
    }

    if (Array.isArray(val)) {
      return val.map((item, index) => {
        const itemKey = `${key}[${index}]`;
        return processValue(itemKey, item);
      }) as ConvertToNumberType<V>;
    }

    if (typeof val === "object" && val !== null) {
      const result: Record<string, any> = {};
      for (const k in val) {
        if (Object.prototype.hasOwnProperty.call(val, k)) {
          result[k] = processValue(`${key}.${k}`, val[k]);
        }
      }
      return result as ConvertToNumberType<V>;
    }

    return val as ConvertToNumberType<V>; // Important: Return original value if not convertible
  }

  return processValue("", value) as ConvertToNumberType<
    V,
    T,
    typeof opts.include
  >;
}

export { convertToNumber };
export default convertToNumber;
