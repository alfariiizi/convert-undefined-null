type ReplaceNullWithUndefined<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? ReplaceNullWithUndefined<U>[] // Handle arrays
    : T[K] extends object
      ? ReplaceNullWithUndefined<T[K]>
      : Exclude<T[K], null | ""> | undefined;
};

const convertNullToUndefined = <T extends object | undefined>(
  obj: T,
): T extends object ? ReplaceNullWithUndefined<T> : undefined => {
  if (!obj || typeof obj !== "object") {
    return undefined as T extends object
      ? ReplaceNullWithUndefined<T>
      : undefined;
  }

  if (Array.isArray(obj)) {
    // Handle arrays
    if (obj.length === 0) {
      return undefined as T extends object
        ? ReplaceNullWithUndefined<T>
        : undefined;
    }
    return obj.map((item) =>
      typeof item === "object"
        ? convertNullToUndefined(item)
        : item === null || item === ""
          ? undefined
          : item,
    ) as T extends object ? ReplaceNullWithUndefined<T> : undefined;
  }

  const entries = Object.entries(obj);
  if (entries.length === 0) {
    return undefined as T extends object
      ? ReplaceNullWithUndefined<T>
      : undefined;
  }

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          key,
          value.length === 0
            ? undefined
            : value.map((item) =>
                item === null || item === "" ? undefined : item,
              ),
        ];
      }

      if (value && typeof value === "object") {
        return [key, convertNullToUndefined(value)];
      }

      return [key, value === null || value === "" ? undefined : value];
    }),
  ) as T extends object ? ReplaceNullWithUndefined<T> : undefined;
};

export { convertNullToUndefined };
export default convertNullToUndefined;
