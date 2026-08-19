#!/usr/bin/env node

import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const writeKey = args[0] === "--write-key";
const [first, second] = writeKey ? args.slice(1) : args;
if (!first || !second) {
  console.error(
    "Usage: combine-shares.mjs [--write-key] <share-one> <share-two>",
  );
  process.exit(1);
}

try {
  const key = combineShares(first, second);
  if (writeKey) {
    await storeKey(key);
    console.error("Rendezvous key stored in .opencode/.rendezvous-key");
  } else {
    process.stdout.write(`${key}\n`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

async function storeKey(key) {
  const keyPath = path.resolve(process.cwd(), ".opencode", ".rendezvous-key");
  const temporaryPath = `${keyPath}.tmp-${process.pid}`;
  await mkdir(path.dirname(keyPath), { recursive: true, mode: 0o700 });
  try {
    // Keep the raw key free of a trailing newline because OpenCode inserts the
    // file contents directly into the Authorization header.
    await writeFile(temporaryPath, key, { encoding: "utf8", mode: 0o600 });
    await rename(temporaryPath, keyPath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
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
