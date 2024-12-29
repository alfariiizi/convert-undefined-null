import { convertNullToUndefined } from "../src";

test("Convert test 1", () => {
  expect(convertNullToUndefined({ abc: null })).toStrictEqual({
    abc: undefined,
  });
});

test("Convert test 2", () => {
  expect(convertNullToUndefined({ abc: { def: null } })).toStrictEqual({
    abc: { def: undefined },
  });
});

test("Convert test 3", () => {
  expect(convertNullToUndefined({ abc: { def: { ghi: null } } })).toStrictEqual(
    {
      abc: { def: { ghi: undefined } },
    },
  );
});

test("Convert test 4", () => {
  const output = convertNullToUndefined({ abc: { def: { ghi: null } } });
  expect(output).toStrictEqual({ abc: { def: { ghi: undefined } } });
});
