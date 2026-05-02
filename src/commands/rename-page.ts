import { Command } from "commander";
import { PageService } from "@/services/page-service";
import chalk from "chalk";

export const renamePage = new Command("rename-page")
  .name("rename-page")
  .description("rename a existing page")
  .argument("<oldName>", "the current name of the page")
  .argument("<newName>", "the new name for the page")
  .option("-p, --private", "rename a page in private groups", false)
  .action(async (oldName: string, newName: string, options: { private: boolean }) => {
    try {
      const pageService = new PageService();
      await pageService.renamePage(oldName, newName, options.private);
      console.log(chalk.greenBright(`Success! Renamed page: ${oldName} to ${newName}`));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      } else {
        console.error(chalk.red("Unexpected error occurred:"), err);
      }
      process.exit(1);
    }
  });