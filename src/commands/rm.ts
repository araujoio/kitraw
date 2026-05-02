import { Command } from "commander";
import { deletePage } from "@/commands/delete-page";

export const rm = new Command("rm")
  .description("remove resources from your project")
  .addCommand(deletePage.name("page"));