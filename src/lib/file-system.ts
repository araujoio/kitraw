import fs from "fs-extra";

export class FileSystem {
  constructor(private readonly fsLib = fs) {}

  private validatePath(path: string, label: string): void {
    if (!path) {
      throw new Error(`${label} is required`);
    }
  }

  async readFile(path: string): Promise<string> {
    this.validatePath(path, "Path");

    try {
      return await this.fsLib.readFile(path, "utf-8");
    } catch (error) {
      throw new Error("Failed to read file:", { cause: error });
    }
  }

  async writeFile(path: string, content: string): Promise<void> {
    this.validatePath(path, "Path");

    try {
      await this.fsLib.writeFile(path, content, "utf-8");
    } catch (error) {
      throw new Error("Failed to write file:", { cause: error });
    }
  }

  async remove(path: string): Promise<void> {
    this.validatePath(path, "Path");

    try {
      await this.fsLib.remove(path);
    } catch (error) {
      throw new Error("Failed to remove file:", { cause: error });
    }
  }

  async copy(src: string, dest: string): Promise<void> {
    this.validatePath(src, "Source");

    this.validatePath(dest, "Destination");
    try {
      await this.fsLib.copy(src, dest);
    } catch (error) {
      throw new Error("Failed to copy file:", { cause: error });
    }
  }

  async move(src: string, dest: string): Promise<void> {
    this.validatePath(src, "Source");

    this.validatePath(dest, "Destination");
    try {
      await this.fsLib.move(src, dest);
    } catch (error) {
      throw new Error("Failed to move file:", { cause: error });
    }
  }

  async exists(path: string): Promise<boolean> {
    this.validatePath(path, "Path");

    return this.fsLib.pathExists(path);
  }

  async readJson<T>(path: string): Promise<T> {
    this.validatePath(path, "Path");

    try {
      return await this.fsLib.readJson(path);
    } catch (error) {
      throw new Error("Failed to read JSON file:", { cause: error });
    }
  }

  async writeJson<T>(path: string, content: T): Promise<void> {
    this.validatePath(path, "Path");

    try {
      await this.fsLib.writeJson(path, content, { spaces: 2 });
    } catch (error) {
      throw new Error("Failed to write JSON file:", { cause: error });
    }
  }
}
