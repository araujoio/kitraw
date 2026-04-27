import { Command } from "commander";
import { PageService } from "@/services/page-service";
import chalk from "chalk";

export const createPage = new Command("create-page")
  .name("create-page")
  .description("create a new page")
  .argument("<name>", "the name for the new page")
  .option("-p, --private", "create a new page in private groups", false)
  .action(async (name: string, options: { private: boolean }) => {
    try {
      const pageService = new PageService();
      await pageService.createPage(name, options.private);
      console.log(chalk.greenBright(`Success! Created page ${name}`));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      } else {
        console.error(chalk.red("Unexpected error occurred:"), err);
      }
      process.exit(1);
    }
  });