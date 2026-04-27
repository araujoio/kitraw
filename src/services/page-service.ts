import { FileSystem } from "@/lib/file-system";
import path from "path";
import { dedent } from "@/utils/dedent";

export class PageService {
  private fileSystem: FileSystem = new FileSystem();

  async createPage(name: string, isPrivate: boolean): Promise<void> {
    let pagePath: string;

    if (isPrivate) {
      pagePath = path.join(process.cwd(), "src", "app", "[locale]", "(private)", name);
    } else {
      pagePath = path.join(process.cwd(), "src", "app", "[locale]", "(public)", name);
    }

    const folderExists: boolean = await this.fileSystem.exists(pagePath);

    if (folderExists) {
      throw new Error(`Folder ${name} already exists`);
    } else {
      await this.fileSystem.writeFile(
        path.join(pagePath, "page.tsx"),
        this.pageTemplate(name)
      );
    }
  }

  private pageTemplate(name: string): string {
    const capitalizedName: string = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    return dedent`

      export default function ${capitalizedName}Page() {
        return (
          <div>
            <h1>${capitalizedName}</h1>
          </div>
        );
      }
    `;
  }
}
