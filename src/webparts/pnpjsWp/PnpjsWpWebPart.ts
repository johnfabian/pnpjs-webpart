import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ServiceScope, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField  
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnpjsWpWebPartStrings';
import PnpjsWp from './components/PnpjsWp';
import { IPnpjsWpProps } from './components/IPnpjsWpProps';
import { PageContext } from '@microsoft/sp-page-context';

import { sp } from "@pnp/sp/presets/all";

export interface IPnpjsWpWebPartProps {
  description: string; 
  pageContext : PageContext,
  serviceScope : ServiceScope
}

export default class PnpjsWpWebPart extends BaseClientSideWebPart<IPnpjsWpWebPartProps> {
  
  protected async onInit(): Promise<void> {

    await super.onInit();
    // other init code may be present  
    sp.setup(this.context);

    let web = await sp.web.get();
    console.log("Web in SPFX", web.Title);
  }
  



  public render(): void {  
    
    const element: React.ReactElement<IPnpjsWpProps> = React.createElement(
      PnpjsWp,
      {
        description: this.properties.description,
        pageContext: this.context.pageContext,
        serviceScope : this.context.serviceScope
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
