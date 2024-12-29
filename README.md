# @alfarizi/convert-to-number

A TypeScript utility package for converting strings, arrays, and objects into
numbers, with support for nested structures. It offers both a strict conversion
(which replaces invalid values with a fallback) and a soft conversion (which
retains non-convertible values).

## Features

- Converts **string** to numbers.
- Handles **nested arrays** and **objects**.
- **TypeScript Support:** Fully typed for safer and predictable usage.
- **Customizable Fallback:** Define a fallback value for unsupported
  conversions.
- Supports **custom fallback** values for invalid conversions.
- Provides a **soft conversion** option where non-convertible values remain
  unchanged.

## Installation

Install the package via npm or yarn:

```bash
npm install @alfarizi/convert-to-number
```

or

```bash
yarn add @alfarizi/convert-to-number
```

## Usage

### `convertToNumber`

This function recursively converts strings, arrays, and objects to numbers. It
replaces non-convertible values with a fallback value (default: `0`).

#### Syntax

```typescript
convertToNumber<V, T = number>(value: V, fallback?: T): ConvertToNumberType<V, T>;
```

#### Example

```typescript
import { convertToNumber } from "@alfarizi/convert-to-number";

const result = convertToNumber("42");
console.log(result); // 42

const resultWithFallback = convertToNumber("abc", 1234);
console.log(resultWithFallback); // 1234

const nestedResult = convertToNumber({
  a: "42",
  b: ["43", "44", "abc"],
  c: { d: "45" },
});
console.log(nestedResult);
// Output: { a: 42, b: [43, 44, 0], c: { d: 45 } }
```

### `convertToNumberSoft`

This function works similarly to `convertToNumber`, but it softens the
conversion. If a value cannot be converted, it returns the original value
instead of replacing it with the fallback.

#### Syntax

```typescript
convertToNumberSoft<V>(value: V): ConvertToNumberSoftType<V>;
```

#### Example

```typescript
import { convertToNumberSoft } from "@alfarizi/convert-to-number";

const result = convertToNumberSoft("42");
console.log(result); // 42

const resultWithInvalidValue = convertToNumberSoft("abc");
console.log(resultWithInvalidValue); // "abc"

const nestedResult = convertToNumberSoft({
  a: "42",
  b: ["43", "44", "abc"],
  c: { d: "45" },
});
console.log(nestedResult);
// Output: { a: 42, b: [43, 44, "abc"], c: { d: 45 } }
```

## API

### `convertToNumber<V, T = number>(value: V, fallback?: T): ConvertToNumberType<V, T>`

#### Parameters

- `value` (`V`): The value to be converted to a number. It can be of any type,
  including primitives, strings, arrays, or objects.
- `fallback` (`T` | optional): The fallback value to return if conversion is not
  possible. Defaults to `0` if not provided.

#### Returns

- `ConvertToNumberType<V, T>`: The converted number or the fallback value.

## `convertToNumberSoft<V>(value: V): ConvertToNumberSoftType<V>`

#### Parameters

- `value` (`V`): The value to be converted to a number. It can be of any type,
  including primitives, strings, arrays, or objects.

#### Returns

- `ConvertToNumberSoftType<V>`: The converted value. If the value cannot be
  converted to a number, it will return the original value (e.g., a string that
  can't be parsed as a number will remain as a string).

## License

`convert-to-number` is licensed under the MIT License. See the
[LICENSE](LICENSE) file for details.

---

Happy coding!
