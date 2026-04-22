import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
 
export const {
  Link: NextLink, 
  redirect: NextRedirect, 
  usePathname: NextUsePathname, 
  useRouter: NextUseRouter, 
  getPathname: NextGetPathname
} =
  createNavigation(routing);