import { Command } from "commander";
import { InitService } from "@/services/init-service";
import chalk from "chalk";

export const init = new Command("init")
  .name("init")
  .alias("create")
  .description("initialize a new nextjs project")
  .argument("<name>", "the name for the new project.")
  .action(async (name: string) => {
    const initService = new InitService();

    try {
      await initService.initializeProject(name);
      console.log((`Success! Created ${name} at: ${chalk.greenBright(process.cwd() + "/" + name)}`));
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      } else {
        console.error(chalk.red("Unexpected error ocurred:"), err);
      }
      process.exit(1);
    }
  });
