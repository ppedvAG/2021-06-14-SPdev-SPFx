import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FirstVNwpWebPart.module.scss';
import * as strings from 'FirstVNwpWebPartStrings';

export interface IFirstVNwpWebPartProps {
  description: string;
}

export default class FirstVNwpWebPart extends BaseClientSideWebPart<IFirstVNwpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.firstVNwp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              
            </div>
          </div>
        </div>
      </div>`;
  }

  /* 
  <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
          <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>    
   */

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
