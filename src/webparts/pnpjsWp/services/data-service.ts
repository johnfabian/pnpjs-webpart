import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";

export interface IDataService {
    getLists(): Promise<any[]>;
  }

  export class DataService {

    public static readonly serviceKey: ServiceKey<IDataService> = ServiceKey.create<IDataService>('SPFx:DataService', DataService);

    constructor(serviceScope: ServiceScope) {

        serviceScope.whenFinished(() => {
    
          const pageContext = serviceScope.consume(PageContext.serviceKey);         
          sp.setup({
            sp : {
              baseUrl : pageContext.web.absoluteUrl
            }
          });
        });
      }

      public getLists():Promise<any[]> {
        return sp.web.lists.get();
      }

  }