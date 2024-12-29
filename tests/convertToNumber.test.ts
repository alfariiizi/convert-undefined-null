import { convertToNumber, convertToNumberSoft } from "../src";

test("Convert string to number", () => {
  expect(convertToNumber("42")).toBe(42);
});

test("Convert string to number with fallback", () => {
  expect(convertToNumber("abc", 1234)).toBe(1234);
});

test("Convert string to number with force false", () => {
  expect(convertToNumberSoft("abc")).toBe("abc");
});

test("Convert array of strings to array of numbers", () => {
  expect(convertToNumber(["42", "43", "44"])).toStrictEqual([42, 43, 44]);
});

test("Convert array of strings to array of numbers with fallback", () => {
  expect(convertToNumber(["42", "abc", "44"], 1234)).toStrictEqual([
    42, 1234, 44,
  ]);
});

test("Convert array of strings to array of numbers with depply nested array", () => {
  expect(convertToNumber(["42", ["43", "44", ["abc", ["2"]]]])).toStrictEqual([
    42,
    [43, 44, [0, [2]]],
  ]);
});

test("Convert array of strings to array of numbers with depply nested array and fallback", () => {
  expect(
    convertToNumber(["42", ["43", "44", ["abc", ["2"]]], "abc"], undefined),
  ).toStrictEqual([42, [43, 44, [undefined, [2]]], undefined]);
});

test("Soft convert array of strings to array of numbers with depply nested array", () => {
  expect(
    convertToNumberSoft(["42", ["43", "44", ["abc", ["2"]]], "abc"]),
  ).toStrictEqual([42, [43, 44, ["abc", [2]]], "abc"]);
});

test("Convert object of strings to object of numbers", () => {
  expect(convertToNumber({ a: "42", b: "43", c: "44" })).toStrictEqual({
    a: 42,
    b: 43,
    c: 44,
  });
});

test("Convert object of strings to object of numbers with fallback", () => {
  expect(convertToNumber({ a: "42", b: "abc", c: "44" }, 1234)).toStrictEqual({
    a: 42,
    b: 1234,
    c: 44,
  });
});

test("Convert object of strings to object of numbers with depply nested object", () => {
  expect(
    convertToNumber({
      a: "42",
      b: { c: "43", d: "44", e: { f: "abc", g: { h: "2" } } },
    }),
  ).toStrictEqual({
    a: 42,
    b: { c: 43, d: 44, e: { f: 0, g: { h: 2 } } },
  });
});

test("Convert object of strings to object of numbers with depply nested object and fallback", () => {
  expect(
    convertToNumber(
      {
        a: "42",
        b: { c: "43", d: "44", e: { f: "abc", g: { h: "2" } } },
        f: "abc",
      },
      undefined,
    ),
  ).toStrictEqual({
    a: 42,
    b: { c: 43, d: 44, e: { f: undefined, g: { h: 2 } } },
    f: undefined,
  });
});

test("Soft convert object of strings to object of numbers with depply nested object", () => {
  expect(
    convertToNumberSoft({
      a: "42",
      b: { c: null, d: "44", e: { f: "abc", g: { h: undefined } } },
      f: "abc",
    }),
  ).toStrictEqual({
    a: 42,
    b: { c: null, d: 44, e: { f: "abc", g: { h: undefined } } },
    f: "abc",
  });
});

test("Convert combination of strings, arrays and objects to numbers", () => {
  expect(
    convertToNumber({
      a: "42",
      b: ["43", "44", "abc"],
      c: { d: "45", e: "46", f: "abc" },
    }),
  ).toStrictEqual({
    a: 42,
    b: [43, 44, 0],
    c: { d: 45, e: 46, f: 0 },
  });
});

test("Convert combination of strings, arrays and objects to numbers with fallback", () => {
  expect(
    convertToNumber(
      {
        a: "42",
        b: ["43", "44", "abc"],
        c: { d: "45", e: "46", f: "abc" },
        g: "abc",
      },
      undefined,
    ),
  ).toStrictEqual({
    a: 42,
    b: [43, 44, undefined],
    c: { d: 45, e: 46, f: undefined },
    g: undefined,
  });
});

test("Soft convert combination of strings, arrays and objects to numbers", () => {
  expect(
    convertToNumberSoft({
      a: "42",
      "123": ["43", "44", "abc"],
      c: { d: "45", e: "46", f: "abc" },
      g: "abc",
    }),
  ).toStrictEqual({
    a: 42,
    "123": [43, 44, "abc"],
    c: { d: 45, e: 46, f: "abc" },
    g: "abc",
  });
});

describe("convertToNumberSoft", () => {
  it("should correctly convert numeric strings to numbers in the JSON structure", () => {
    const input = {
      status: "success",
      message: "Data retrieved successfully",
      data: [
        {
          id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
          name: "PERSONAL",
          description: "Personal Plan",
          priority: 0,
          price: "108000",
          before_discount_price: "120000",
          is_free: true,
          discount: 10,
          duration_in_days: 30,
          billed: "MONTHLY",
          update_support: false,
          count_product: 5,
          count_order: 40,
          team_member: 3,
          reseller: 0,
          checkout_page: true,
          landing_page_builder: true,
          store_builder: false,
          cod: false,
          change_logo: false,
          rent_account_business: true,
          createdAt: "2024-12-16T08:55:03.688Z",
          updatedAt: "2024-12-16T08:55:03.688Z",
          deletedAt: null,
          packages_description: [
            {
              id: "3dc3770a-b2e6-4553-ad19-a8ff9ac65129",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "true",
              desc: "Harga paling terjangkau. Hanya  {{price}}",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
            {
              id: "b1cc8dbb-6f1c-4648-bea3-5de92913b577",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "true",
              desc: "{{team_member}} Team member",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
            {
              id: "e94c2619-4f01-4fe7-9c9b-28428197d986",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "false",
              desc: "Jumlah produk sampai {{count_product}}",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
          ],
        },
      ],
    };

    const expectedOutput = {
      status: "success",
      message: "Data retrieved successfully",
      data: [
        {
          id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
          name: "PERSONAL",
          description: "Personal Plan",
          priority: 0,
          price: 108000, // Converted
          before_discount_price: 120000, // Converted
          is_free: true,
          discount: 10,
          duration_in_days: 30,
          billed: "MONTHLY",
          update_support: false,
          count_product: 5,
          count_order: 40,
          team_member: 3,
          reseller: 0,
          checkout_page: true,
          landing_page_builder: true,
          store_builder: false,
          cod: false,
          change_logo: false,
          rent_account_business: true,
          createdAt: "2024-12-16T08:55:03.688Z",
          updatedAt: "2024-12-16T08:55:03.688Z",
          deletedAt: null,
          packages_description: [
            {
              id: "3dc3770a-b2e6-4553-ad19-a8ff9ac65129",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "true",
              desc: "Harga paling terjangkau. Hanya  {{price}}",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
            {
              id: "b1cc8dbb-6f1c-4648-bea3-5de92913b577",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "true",
              desc: "{{team_member}} Team member",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
            {
              id: "e94c2619-4f01-4fe7-9c9b-28428197d986",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "false",
              desc: "Jumlah produk sampai {{count_product}}",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
          ],
        },
      ],
    };

    const output = convertToNumberSoft(input, {
      include: ["data.[].before_discount_price"],
    });
    output.data[0].before_discount_price;

    expect(output).toEqual(expectedOutput);
  });
});

describe("convertToNumber - Complex JSON Structure", () => {
  test("should convert complex JSON structure with nested objects and arrays", () => {
    const input = {
      status: "success",
      message: "Data retrieved successfully",
      data: [
        {
          id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
          name: "PERSONAL",
          description: "Personal Plan",
          priority: 0,
          price: "108000",
          before_discount_price: "120000",
          is_free: true,
          discount: 10,
          duration_in_days: 30,
          billed: "MONTHLY",
          update_support: false,
          count_product: 5,
          count_order: 40,
          team_member: 3,
          reseller: 0,
          checkout_page: true,
          landing_page_builder: true,
          store_builder: false,
          cod: false,
          change_logo: false,
          rent_account_business: true,
          createdAt: "2024-12-16T08:55:03.688Z",
          updatedAt: "2024-12-16T08:55:03.688Z",
          deletedAt: null,
          packages_description: [
            {
              id: "3dc3770a-b2e6-4553-ad19-a8ff9ac65129",
              package_id: "61ed78f4-587f-4dc0-b9e7-061c811b1c13",
              check: "true",
              desc: "Harga paling terjangkau. Hanya  {{price}}",
              createdAt: "2024-12-16T08:55:03.688Z",
              updatedAt: "2024-12-16T08:55:03.688Z",
              deletedAt: null,
            },
          ],
        },
      ],
    };

    const expected = {
      status: 0,
      message: 0,
      data: [
        {
          id: 0,
          name: 0,
          description: 0,
          priority: 0,
          price: 108000,
          before_discount_price: 120000,
          is_free: 0,
          discount: 10,
          duration_in_days: 30,
          billed: 0,
          update_support: 0,
          count_product: 5,
          count_order: 40,
          team_member: 3,
          reseller: 0,
          checkout_page: 0,
          landing_page_builder: 0,
          store_builder: 0,
          cod: 0,
          change_logo: 0,
          rent_account_business: 0,
          createdAt: 0,
          updatedAt: 0,
          deletedAt: 0,
          packages_description: [
            {
              id: 0,
              package_id: 0,
              check: 0,
              desc: 0,
              createdAt: 0,
              updatedAt: 0,
              deletedAt: 0,
            },
          ],
        },
      ],
    };

    const output = convertToNumber(input, undefined, {
      include: ["data.[].before_discount_price"],
    });
    output.data[0].before_discount_price;

    expect(output).toEqual(expected);
  });
});
