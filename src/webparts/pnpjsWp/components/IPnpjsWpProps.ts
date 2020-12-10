import { ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';

export interface IPnpjsWpProps {
  description: string;
  pageContext : PageContext;
  serviceScope : ServiceScope
}
