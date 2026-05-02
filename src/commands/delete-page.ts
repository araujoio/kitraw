import { Command } from "commander";
import { PageService } from "@/services/page-service";
import chalk from "chalk";

export const deletePage = new Command("delete-page")
  .name("delete-page")
  .description("delete a existing page")
  .argument("<name...>", "the name for the page")
  .option("-p, --private", "delete a page in private groups", false)
  .action(async (names: string[], options: { private: boolean }) => {
    try {
      const pageService = new PageService();
      await pageService.deletePage(names, options.private);
      console.log(chalk.greenBright(`Success! Deleted page: ${names.join(", ")}`));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      } else {
        console.error(chalk.red("Unexpected error occurred:"), err);
      }
      process.exit(1);
    }
  });