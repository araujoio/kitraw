import { Command } from "commander";
import { PageService } from "@/services/page-service";
import { logger } from "@/services/logger-service";

export const createPage = new Command("create-page")
  .name("create-page")
  .description("create a new page")
  .argument("<names...>", "the names for the new pages")
  .option("-p, --private", "create new pages in private groups", false)
  .action(async (names: string[], options: { private: boolean }) => {
    const pageService = new PageService();

    logger.info(`enumerating pages: ${names.length}, group: ${options.private ? 'private' : 'public'}`, false);
    
    try {
      await pageService.createPage(names, options.private);
      logger.info(`resolving 100% ${names.length}/${names.length}, done`, false);
      logger.success(`session: ${logger.getSessionID()} > look at ${logger.formatLink(logger.getAuditPath())}`, false);
    } catch (err) {
      logger.error("error creating pages", err);
      process.exit(1);
    }
  });