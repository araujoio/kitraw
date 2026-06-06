import { FileSystem } from "@/lib/file-system";
import { fileURLToPath } from "url";
import path from "path";

export class InitService {
  private fileSystem: FileSystem = new FileSystem();

  async initializeProject(name: string): Promise<void> {
    const projectPath: string = path.join(process.cwd(), name);
    const templatePath: string = path.join(path.dirname(fileURLToPath(import.meta.url)), "templates", "next-app");
    const kitrawPath: string = path.join(process.cwd(), "kitraw.json");

    if (await this.fileSystem.exists(projectPath)) {
      throw new Error(`folder ${name} already exists at ${projectPath}`);
    }

    if (await this.fileSystem.exists(kitrawPath)) {
      throw new Error(`kitraw.json already exists at ${process.cwd()}`);
    }

    await this.fileSystem.copy(templatePath, projectPath);
  }
}