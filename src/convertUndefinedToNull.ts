type ReplaceUndefinedWithNull<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? ReplaceUndefinedWithNull<U>[] // Handle arrays
    : T[K] extends object
      ? ReplaceUndefinedWithNull<T[K]>
      : Exclude<T[K], undefined> | null;
};

const convertUndefinedToNull = <T extends object | undefined>(
  obj: T,
): T extends object ? ReplaceUndefinedWithNull<T> : null => {
  if (obj === undefined || typeof obj !== "object") {
    return null as T extends object ? ReplaceUndefinedWithNull<T> : null;
  }

  if (Array.isArray(obj)) {
    // Handle arrays
    return obj.map((item) =>
      typeof item === "object"
        ? convertUndefinedToNull(item)
        : item === undefined
          ? null
          : item,
    ) as T extends object ? ReplaceUndefinedWithNull<T> : null;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.map((item) => (item === undefined ? null : item))];
      }

      if (value && typeof value === "object") {
        return [key, convertUndefinedToNull(value)];
      }

      return [key, value === undefined ? null : value];
    }),
  ) as T extends object ? ReplaceUndefinedWithNull<T> : null;
};

export { convertUndefinedToNull };
export default convertUndefinedToNull;
