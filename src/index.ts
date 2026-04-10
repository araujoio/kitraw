import { Command } from "commander";
import { init } from "@/commands/init";

async function main() {
  const program = new Command();

  program
    .name("kitraw")
    .description("a modern generator for nextjs projects")
    .version("1.0.0");

  program.addCommand(init);

  program.parse();
}

main();
