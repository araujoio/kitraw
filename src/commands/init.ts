import { Command } from "commander";
import chalk from "chalk";

export const init = new Command("init")
  .description("initialize a new nextjs project")
  .argument("<name>", "project name")
  .action(async (name: string) => {
    console.log(chalk.green(`initializing project: ${name}`));
  });
