import { Command } from "commander";
import { InitService } from "@/services/init-service";
import { logger } from "@/services/logger-service";
import path from "path";

export const init = new Command("init")
  .name("init")
  .alias("create")
  .description("initialize a new nextjs project")
  .argument("<name>", "the name for the new project.")
  .action(async (name: string) => main(name)
);

async function main(name: string) : Promise<void> {
  const initService = new InitService();
  
  try {
    await initService.initializeProject(name);
    logger.info(`initialized empty next-app project in: ${path.join(process.cwd(), name)}`, false);
  } catch (err) {
    logger.error("initialization error:", err, false);
    process.exit(1);
  }
}

