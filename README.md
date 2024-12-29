# @alfarizi/convert-undefined-null

`ConvertNullUndefined` is a lightweight utility package that provides functions
to transform `null` values to `undefined` and vice versa in JavaScript and
TypeScript objects. This is especially useful when working with APIs or data
transformations where the distinction between `null` and `undefined` matters.

## Installation

```bash
npm install @alfarizi/convert-undefined-null
```

or

```bash
yarn add @alfarizi/convert-undefined-null
```

## Features

- **Convert `null` values to `undefined`**: Use `convertNullToUndefined` to
  recursively replace `null` values in objects, arrays, or primitives with
  `undefined`.
- **Convert `undefined` values to `null`**: Use `convertUndefinedToNull` to
  recursively replace `undefined` values in objects, arrays, or primitives with
  `null`.
- Fully type-safe: Includes TypeScript support with accurate typings for input
  and output transformations.
- Handles nested structures, arrays, and edge cases seamlessly.

## Usage

### Importing

```typescript
import convertNullToUndefined from "@alfarizi/convert-undefined-null";
import convertUndefinedToNull from "@alfarizi/convert-undefined-null";
```

### Converting `null` to `undefined`

```typescript
type SampleType = {
  name: string | null;
  age: number | null;
  tags: (string | null)[];
};

const sample: SampleType = {
  name: null,
  age: 25,
  tags: ["tag1", null, "tag3"],
};

const result = convertNullToUndefined(sample);

console.log(result);
// Output: { name: undefined, age: 25, tags: ["tag1", undefined, "tag3"] }
```

### Converting `undefined` to `null`

```typescript
type SampleType = {
  name: string | undefined;
  age: number | undefined;
  tags: (string | undefined)[];
};

const sample: SampleType = {
  name: undefined,
  age: 25,
  tags: ["tag1", undefined, "tag3"],
};

const result = convertUndefinedToNull(sample);

console.log(result);
// Output: { name: null, age: 25, tags: ["tag1", null, "tag3"] }
```

### Handling Edge Cases

- Empty objects and arrays are returned as-is.
- Non-object values are converted directly (e.g., `null` to `undefined` or
  `undefined` to `null`).
- Works seamlessly with nested objects and arrays.

## API

### `convertNullToUndefined`

```typescript
function convertNullToUndefined<T extends object | undefined>(
  obj: T,
): T extends object ? ReplaceNullWithUndefined<T> : undefined;
```

#### Parameters

- `obj`: The object, array, or primitive value to convert.

#### Returns

- A new object with all `null` values replaced by `undefined`.

### `convertUndefinedToNull`

```typescript
function convertUndefinedToNull<T extends object | undefined>(
  obj: T,
): T extends object ? ReplaceUndefinedWithNull<T> : null;
```

#### Parameters

- `obj`: The object, array, or primitive value to convert.

#### Returns

- A new object with all `undefined` values replaced by `null`.

## Type Definitions

### `ReplaceNullWithUndefined`

Transforms all `null` values in a type to `undefined`.

```typescript
type ReplaceNullWithUndefined<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? ReplaceNullWithUndefined<U>[]
    : T[K] extends object
      ? ReplaceNullWithUndefined<T[K]>
      : Exclude<T[K], null | ""> | undefined;
};
```

### `ReplaceUndefinedWithNull`

Transforms all `undefined` values in a type to `null`.

```typescript
type ReplaceUndefinedWithNull<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? ReplaceUndefinedWithNull<U>[]
    : T[K] extends object
      ? ReplaceUndefinedWithNull<T[K]>
      : Exclude<T[K], undefined> | null;
};
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
