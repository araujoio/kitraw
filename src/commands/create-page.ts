import { Command } from "commander";
import { PageService } from "@/services/page-service";
import { logger } from "@/services/logger-service";

export const createPage = new Command("create-page")
  .name("create-page")
  .description("create a new page")
  .argument("<names...>", "the names for the new pages")
  .option("-p, --private", "create new pages in private groups", false)
  .action(async (names: Array<string>, options: { private: boolean }) => main(names, options)
);

async function main(names: Array<string>, options: { private: boolean }) : Promise<void> {
  const pageService = new PageService();

  logger.info(`enumerating pages: ${names.length}, group: ${options.private ? 'private' : 'public'}`);
  
  try {
    await pageService.createPage(names, options.private);
    logger.info(`resolving 100% ${names.length}/${names.length}, done`, false);
    logger.success(`session: ${logger.getSessionID()}, audit: ${logger.formatLink(logger.getAuditPath())}`, false);
  } catch (err) {
    logger.error("unexpected error ocurred:", err);
    process.exit(1);
  }
}
