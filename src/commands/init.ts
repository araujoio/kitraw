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
  
  logger.info(`Initializing project: ${name}`);
  
  try {
    await initService.initializeProject(name);
    logger.success(`Created project: ${name}`);
    logger.info(`Project path: ${path.join(process.cwd(), name)}`);
  } catch (err) {
    logger.error("Initialization error", err);
    process.exit(1);
  }
}

