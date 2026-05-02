import { FileSystem } from "@/lib/file-system";
import path from "path";
import { dedent } from "@/utils/dedent";

export class PageService {
  private fileSystem: FileSystem = new FileSystem();

  async createPage(name: string, isPrivate: boolean): Promise<void> {
    const group: string = isPrivate ? "private" : "public";
    const pagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, name);
    const groupLayoutPath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, "layout.tsx");

    const folderExists: boolean = await this.fileSystem.exists(pagePath);

    if (folderExists) {
      throw new Error(`Folder ${name} already exists`);
    } else {
      await this.fileSystem.writeFile(path.join(pagePath, "page.tsx"), this.pageTemplate(name));
      const groupLayoutExists: boolean = await this.fileSystem.exists(groupLayoutPath);
      if (!groupLayoutExists) {
        if (group === "public") {
          await this.fileSystem.writeFile(groupLayoutPath, this.publicLayoutTemplate());
        } else {
          await this.fileSystem.writeFile(groupLayoutPath, this.privateLayoutTemplate());
        }
      }
    }
  }

  async deletePage(name: string, isPrivate: boolean): Promise<void> {
    const group: string = isPrivate ? "private" : "public";
    const pagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, name);
    const folderExists: boolean = await this.fileSystem.exists(pagePath);

    if (folderExists) {
      await this.fileSystem.remove(pagePath);
    } else {
      throw new Error(`Folder ${name} does not exist`);
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

  private publicLayoutTemplate(): string {
    return dedent`
      type Props = { children: React.ReactNode };
 
      export default async function PublicLayout({children}: Props) {
        return (
          <>
            {children}
          </>
        );
      }
    `;
  }

  private privateLayoutTemplate(): string {
    return dedent`
      type Props = { children: React.ReactNode };
 
      export default async function PrivateLayout({children}: Props) {
        return (
          <>
            {children}
          </>
        );
      }
    `;
  }
}
