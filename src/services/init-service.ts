import { FileSystem } from "@/lib/file-system";
import { fileURLToPath } from "url";
import path from "path";

export class InitService {
  private fileSystem: FileSystem = new FileSystem();

  async initializeProject(name: string): Promise<void> {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectPath: string = path.join(process.cwd(), name);
    const templatePath: string = path.join(__dirname, "templates", "next-app");
    const folderExists: boolean = await this.fileSystem.exists(projectPath);

    if (folderExists) {
      throw new Error(`Folder ${name} already exists`);
    } else {
      await this.fileSystem.copy(templatePath, projectPath);
    }
  }
}