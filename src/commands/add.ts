import { Command } from "commander";
import { createPage } from "@/commands/create-page";

export const add = new Command("add")
  .description("add resources to your project")
  .addCommand(createPage.name("page"));
