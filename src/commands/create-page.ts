import { Command } from "commander";
import { PageService } from "@/services/page-service";
import chalk from "chalk";

export const createPage = new Command("create-page")
  .name("create-page")
  .description("create a new page")
  .argument("<names...>", "the names for the new pages")
  .option("-p, --private", "create new pages in private groups", false)
  .action(async (names: string[], options: { private: boolean }) => {
    try {
      const pageService = new PageService();
      await pageService.createPage(names, options.private);
      console.log(chalk.greenBright(`Success! Created pages: ${names.join(", ")}`));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      } else {
        console.error(chalk.red("Unexpected error occurred:"), err);
      }
      process.exit(1);
    }
  });