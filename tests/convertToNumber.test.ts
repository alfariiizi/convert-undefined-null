import { convertUndefinedToNull } from "../src";

test("Convert test 1", () => {
  expect(convertUndefinedToNull({ abc: undefined })).toStrictEqual({
    abc: null,
  });
});

test("Convert test 2", () => {
  expect(convertUndefinedToNull({ abc: { def: undefined } })).toStrictEqual({
    abc: { def: null },
  });
});

test("Convert test 3", () => {
  expect(
    convertUndefinedToNull({ abc: { def: { ghi: undefined } } }),
  ).toStrictEqual({
    abc: { def: { ghi: null } },
  });
});

test("Convert test 4", () => {
  const output = convertUndefinedToNull({ abc: { def: { ghi: undefined } } });
  expect(output).toStrictEqual({ abc: { def: { ghi: null } } });
});
