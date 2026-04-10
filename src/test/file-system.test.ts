import { test, expect } from "vitest";
import { FileSystem } from "../lib/file-system";

const fileSystem = new FileSystem();

test("read file should return the content of the file", async () => {
  const fileName = "./test-read.txt";

  await fileSystem.writeFile(fileName, "Hello world!");
  const result = await fileSystem.readFile(fileName);
  expect(result).toBe("Hello world!");

  await fileSystem.remove(fileName);
});

test("read file should throw an error if the file does not exist", async () => {
  const fileName = "./test-read.txt";

  await expect(fileSystem.readFile(fileName)).rejects.toThrow();
});

test("write file should write the content of the file", async () => {
  const fileName = "./test-write.txt";

  await fileSystem.writeFile(fileName, "");
  const result = await fileSystem.exists(fileName);
  expect(result).toBe(true);

  await fileSystem.remove(fileName);
});

test("write file should throw an error if the path is empty", async () => {
  const fileName = "";

  await expect(fileSystem.writeFile(fileName, "")).rejects.toThrow();
});

test("remove file should remove the file", async () => {
  const fileName = "./test-remove.txt";

  await fileSystem.writeFile(fileName, "");
  await fileSystem.remove(fileName);
  const result = await fileSystem.exists(fileName);
  expect(result).toBe(false);
});

test("remove file should should throw an error if the path is empty", async () => {
  const fileName = "";

  await expect(fileSystem.remove(fileName)).rejects.toThrow();
});

test("copy file should copy the file", async () => {
  const fileName = "./test-copy.txt";
  const destName = "./test-copy-dest.txt";

  await fileSystem.writeFile(fileName, "");
  await fileSystem.copy(fileName, destName);
  const result = await fileSystem.exists(destName);
  expect(result).toBe(true);

  await fileSystem.remove(fileName);
  await fileSystem.remove(destName);
});

test("move file should move the file", async () => {
  const fileName = "./test-move.txt";
  const destName = "./test-move-dest.txt";

  await fileSystem.writeFile(fileName, "");
  await fileSystem.move(fileName, destName);
  const result = await fileSystem.exists(destName);
  expect(result).toBe(true);

  await fileSystem.remove(fileName);
  await fileSystem.remove(destName);
});

test("copy file should throw if source or destination is empty", async () => {
  await expect(fileSystem.copy("", "dest")).rejects.toThrow(
    "Source is required"
  );
  await expect(fileSystem.copy("src", "")).rejects.toThrow(
    "Destination is required"
  );
});

test("move file should throw if source or destination is empty", async () => {
  await expect(fileSystem.move("", "dest")).rejects.toThrow(
    "Source is required"
  );
  await expect(fileSystem.move("src", "")).rejects.toThrow(
    "Destination is required"
  );
});

test("exists should return true if file exists", async () => {
  const fileName = "./test-exists.txt";
  await fileSystem.writeFile(fileName, "");
  expect(await fileSystem.exists(fileName)).toBe(true);
  await fileSystem.remove(fileName);
});

test("exists should return false if file does not exist", async () => {
  expect(await fileSystem.exists("./non-existent.txt")).toBe(false);
});

test("exists should throw if path is empty", async () => {
  await expect(fileSystem.exists("")).rejects.toThrow("Path is required");
});

test("readJson should read and parse json file", async () => {
  const fileName = "./test.json";
  const data = { hello: "world" };
  await fileSystem.writeJson(fileName, data);
  const result = await fileSystem.readJson<{ hello: string }>(fileName);
  expect(result).toEqual(data);
  await fileSystem.remove(fileName);
});

test("readJson should throw if path is empty", async () => {
  await expect(fileSystem.readJson("")).rejects.toThrow("Path is required");
});

test("readJson should throw if file does not exist", async () => {
  await expect(fileSystem.readJson("./no-json.json")).rejects.toThrow(
    "Failed to read JSON file"
  );
});

test("writeJson should write json file", async () => {
  const fileName = "./test-write.json";
  const data = { a: 1 };
  await fileSystem.writeJson(fileName, data);
  expect(await fileSystem.exists(fileName)).toBe(true);
  const result = await fileSystem.readJson(fileName);
  expect(result).toEqual(data);
  await fileSystem.remove(fileName);
});

test("writeJson should throw if path is empty", async () => {
  await expect(fileSystem.writeJson("", {})).rejects.toThrow(
    "Path is required"
  );
});
