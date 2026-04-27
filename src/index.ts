import { Command } from "commander";
import { init } from "@/commands/init";
import { add } from "@/commands/add";

async function main() {
  const program = new Command();

  program
    .name("kitraw")
    .description("a modern generator for nextjs projects")
    .version("1.0.0");

  program
    .addCommand(init)
    .addCommand(add);

  program.parse();
}

main();
