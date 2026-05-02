import { Command } from "commander";
import { renamePage } from "@/commands/rename-page";

export const mv = new Command("mv")
  .alias("move")
  .description("move resources from your project")
  .addCommand(renamePage.name("page"));