type Join<K, P> = P extends "" ? `${K}` : `${K}.${P}`;

type Path<
  T,
  IncludeArray extends boolean = true,
  Depth extends number[] = [],
> = Depth["length"] extends 5
  ? "" // Stop recursion after 5 levels
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

type ConvertToNumberSoftResult<
  T,
  IncludePaths extends PathsOf<T>[],
  CurrentPath extends string = "",
> =
  T extends Array<infer U>
    ? Array<
        ConvertToNumberSoftResult<U, IncludePaths, `${CurrentPath}.[${number}]`>
      >
    : T extends object
      ? {
          [K in keyof T]: K extends string
            ? T[K] extends object
              ? ConvertToNumberSoftResult<
                  T[K],
                  IncludePaths,
                  `${CurrentPath}.${K}`
                >
              : IncludePaths[number] extends string
                ? MatchPath<
                    IncludePaths[number],
                    `${CurrentPath}.${K}`
                  > extends true
                  ? T[K] extends string
                    ? string | number
                    : T[K]
                  : T[K]
                : T[K]
            : T[K];
        }
      : T;

function convertToNumberSoft<T, IncludePaths extends PathsOf<T>[]>(
  value: T,
  opts?: { include?: IncludePaths; exclude?: PathsOf<T>[] },
): ConvertToNumberSoftResult<T, IncludePaths> {
  const shouldInclude = (key: string) =>
    opts?.include?.some((path) => {
      const normalizedPath = path.replace(/\[\]/g, "[0]");
      return key.startsWith(normalizedPath);
    }) ?? true;
  const shouldExclude = (key: string) =>
    opts?.exclude?.some((path) => {
      const normalizedPath = path.replace(/\[\]/g, "[0]");
      return key.startsWith(normalizedPath);
    }) ?? false;

  const processValue = (key: string, val: any): any => {
    if (shouldExclude(key)) return val;
    if (!shouldInclude(key)) return val;

    if (typeof val === "number") {
      return val;
    }

    if (Array.isArray(val)) {
      return val.map((item, index) => {
        const itemKey = `${key}[${index}]`;
        return processValue(itemKey, item);
      });
    }

    if (typeof val === "object" && val !== null) {
      const result: Record<string, any> = {};
      for (const k in val) {
        if (Object.prototype.hasOwnProperty.call(val, k)) {
          result[k] = processValue(`${key}.${k}`, val[k]);
        }
      }
      return result;
    }

    if (typeof val === "string") {
      const trimmedValue = val.trim();
      const parsedValue = Number(trimmedValue);
      return isNaN(parsedValue) ? val : parsedValue;
    }

    return val;
  };

  return processValue("", value) as ConvertToNumberSoftResult<T, IncludePaths>;
}

export default convertToNumberSoft;
export { convertToNumberSoft };
