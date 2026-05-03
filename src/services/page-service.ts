import { FileSystem } from "@/lib/file-system";
import path from "path";
import { dedent } from "@/utils/dedent";
import { logger } from "@/services/logger-service";

export class PageService {
  private fileSystem: FileSystem = new FileSystem();

  async createPage(name: Array<string>, isPrivate: boolean): Promise<void> {
    const group: string = isPrivate ? "private" : "public";
    const groupLayoutPath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, "layout.tsx");
    const kitrawPath: string = path.join(process.cwd(), "kitraw.json");
    const kitrawExists: boolean = await this.fileSystem.exists(kitrawPath);
    const kitrawConfig: any = await this.fileSystem.readJson(kitrawPath);
    
    if (!kitrawExists) {
      throw new Error(`File ${kitrawPath} does not exist`);
    }

    let count: number = 1;
    for (const pageName of name) {
      const pagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, pageName);
      const folderExists: boolean = await this.fileSystem.exists(pagePath);

      if (folderExists) {
        continue;
      } else {
        await this.fileSystem.writeFile(path.join(pagePath, "page.tsx"), this.pageTemplate(pageName));

        logger.info(`  created ${count}/${name.length} > ${logger.formatLink(path.join("src", "app", "[locale]", `(${group})`, pageName, "page.tsx"))}`, false);

        kitrawConfig["routes"][group + "Routes"].push(pageName);
        count++;
      }
    }

    await this.fileSystem.writeJson(kitrawPath, kitrawConfig);
    const groupLayoutExists: boolean = await this.fileSystem.exists(groupLayoutPath);
    if (!groupLayoutExists) {
      if (group === "public") {
        await this.fileSystem.writeFile(groupLayoutPath, this.publicLayoutTemplate());
        logger.info(`  created ${group} layout to ${logger.formatLink(path.join("src", "app", "[locale]", `(${group})`, "layout.tsx"))}`, false);
      } else {
        await this.fileSystem.writeFile(groupLayoutPath, this.privateLayoutTemplate());
        logger.info(`  created ${group} layout to ${logger.formatLink(path.join("src", "app", "[locale]", `(${group})`, "layout.tsx"))}`, false);
      }
    }
  }

  async deletePage(name: Array<string>, isPrivate: boolean): Promise<void> {
    const group: string = isPrivate ? "private" : "public";
    const kitrawPath: string = path.join(process.cwd(), "kitraw.json");
    const kitrawExists: boolean = await this.fileSystem.exists(kitrawPath);
    const kitrawConfig: any = await this.fileSystem.readJson(kitrawPath);

    if (!kitrawExists) {
      throw new Error(`File ${kitrawPath} does not exist`);
    }

    let count: number = 1;
    for (const pageName of name) {
      const pagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, pageName);
      const folderExists: boolean = await this.fileSystem.exists(pagePath);

      if (folderExists) {
        await this.fileSystem.remove(pagePath);

        const routes: Array<string> = kitrawConfig["routes"][group + "Routes"];
        const newRoutes: Array<string> = routes.filter((route: string) => route !== pageName);
        kitrawConfig["routes"][group + "Routes"] = newRoutes;

        logger.info(`  deleted ${count}/${name.length} > ${logger.formatLink(path.join("src", "app", "[locale]", `(${group})`, pageName, "page.tsx"))}`, false);
      } else {
        logger.warn(`  skipped ${count}/${name.length} > ${logger.formatLink(path.join("src", "app", "[locale]", `(${group})`, pageName, "page.tsx"))}`, false);
      }
      count++;
    }

    await this.fileSystem.writeJson(kitrawPath, kitrawConfig);
  }

  async renamePage(oldName: string, newName: string, isPrivate: boolean): Promise<void> {
    const group: string = isPrivate ? "private" : "public";
    const oldPagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, oldName);
    const newPagePath: string = path.join(process.cwd(), "src", "app", "[locale]", `(${group})`, newName);

    const oldPageExists: boolean = await this.fileSystem.exists(oldPagePath);
    const newPageExists: boolean = await this.fileSystem.exists(newPagePath);

    if (!oldPageExists) {
      throw new Error(`Page "${oldName}" does not exist in the ${group} group.`);
    }

    if (newPageExists) {
      throw new Error(`Page "${newName}" already exists in the ${group} group.`);
    }

    const kitrawPath: string = path.join(process.cwd(), "kitraw.json");
    const kitrawExists: boolean = await this.fileSystem.exists(kitrawPath);

    if (!kitrawExists) {
      throw new Error(`File ${kitrawPath} does not exist. Make sure you are in the root of a kitraw project.`);
    }

    await this.fileSystem.move(oldPagePath, newPagePath);

    const kitrawConfig: any = await this.fileSystem.readJson(kitrawPath);

    const routes: Array<string> = kitrawConfig["routes"][group + "Routes"];
    const newRoutes: Array<string> = routes.filter((route: string) => route !== oldName);
    kitrawConfig["routes"][group + "Routes"] = newRoutes;

    await this.fileSystem.writeJson(kitrawPath, kitrawConfig);
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
