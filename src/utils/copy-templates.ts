import { FileSystem } from "@/lib/file-system";
import path from "path";

const fileSystem: FileSystem = new FileSystem();
const templatePath: string = path.join(process.cwd(), "src", "templates");
const distPath: string = path.join(process.cwd(), "dist", "templates");

fileSystem.copy(templatePath, distPath);
