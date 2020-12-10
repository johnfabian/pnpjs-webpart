import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

import { IItems, sp } from "@pnp/sp/presets/all";
import { IList, IListInfo } from "@pnp/sp/lists";

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

      public getLists():Promise<IListInfo[]> {
        return sp.web.lists.get();
      }

      public getCalendarByTitle(title : string):Promise<IListInfo>{
        return sp.web.lists.getByTitle(title).get();
      }

      public getCalenderEvents(title: string):Promise<IItems>{
        return sp.web.lists.getByTitle(title).items.get();
      }

  }