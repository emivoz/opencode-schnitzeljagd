#!/usr/bin/env node

const [first, second] = process.argv.slice(2);
if (!first || !second) {
  console.error("Usage: combine-shares.mjs <share-one> <share-two>");
  process.exit(1);
}

try {
  process.stdout.write(`${combineShares(first, second)}\n`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

function combineShares(left, right) {
  const a = decode(left);
  const b = decode(right);
  if (a.x === b.x) throw new Error("Shares must come from different stations.");
  if (a.values.length !== b.values.length) throw new Error("Shares belong to different games.");
  const output = Buffer.alloc(a.values.length);
  const denominator = a.x ^ b.x;
  const aWeight = divide(b.x, denominator);
  const bWeight = divide(a.x, denominator);
  for (let i = 0; i < output.length; i += 1) {
    output[i] = multiply(a.values[i], aWeight) ^ multiply(b.values[i], bWeight);
  }
  return output.toString("utf8");
}

function decode(value) {
  const [prefix, encoded, extra] = value.trim().split(".");
  if (prefix !== "bsp1" || !encoded || extra) throw new Error("Invalid Banana Split share.");
  const payload = Buffer.from(encoded, "base64url");
  if (!payload[0] || payload.length < 2) throw new Error("Invalid Banana Split share payload.");
  return { x: payload[0], values: payload.subarray(1) };
}

function multiply(left, right) {
  let a = left;
  let b = right;
  let product = 0;
  while (b > 0) {
    if (b & 1) product ^= a;
    const carry = a & 0x80;
    a = (a << 1) & 0xff;
    if (carry) a ^= 0x1b;
    b >>= 1;
  }
  return product;
}

function divide(numerator, denominator) {
  if (denominator === 0) throw new Error("Cannot combine duplicate shares.");
  return multiply(numerator, power(denominator, 254));
}

function power(value, exponent) {
  let result = 1;
  let base = value;
  let remaining = exponent;
  while (remaining > 0) {
    if (remaining & 1) result = multiply(result, base);
    base = multiply(base, base);
    remaining >>= 1;
  }
  return result;
}
