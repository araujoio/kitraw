import { FileSystem } from "@/lib/file-system";
import path from "path";

const fileSystem = new FileSystem();
const templatePath = path.join(process.cwd(), "src", "templates");
const distPath = path.join(process.cwd(), "dist", "templates");

fileSystem.copy(templatePath, distPath);
