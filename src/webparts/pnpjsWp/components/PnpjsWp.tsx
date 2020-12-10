import * as React from 'react';
import styles from './PnpjsWp.module.scss';
import { IPnpjsWpProps } from './IPnpjsWpProps';
import { escape, times } from '@microsoft/sp-lodash-subset';

import { IList, IWebInfo, sp } from "@pnp/sp/presets/all";
import {DataService} from "../services/data-service";

export default class PnpjsWp extends React.Component<IPnpjsWpProps, {}> {

   private _dataServiceInstance : DataService;
    
  constructor(props:IPnpjsWpProps ){
    super(props);   
    
  }

  public async componentDidMount(){
    //console.log("Site Url", this.props.pageContext.web.absoluteUrl);

    this._dataServiceInstance = this.props.serviceScope.consume(DataService.serviceKey) as DataService;
    //let lists = await _dataServiceInstance.getLists();    
    //console.log("DataService Lists", lists);

    let calendar1 = await this._dataServiceInstance.getCalendarByTitle("Calendar1");
    let items = await this._dataServiceInstance.getCalenderEvents("Calendar1");
     console.log("items", items);

  } 


  public render(): React.ReactElement<IPnpjsWpProps> {
    return(
      <div>
        <h3>Component</h3>
        <h2>{this.props.description}</h2>
      </div>
    );
  }
}
