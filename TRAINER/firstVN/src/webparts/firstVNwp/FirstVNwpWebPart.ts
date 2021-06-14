import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FirstVNwpWebPart.module.scss';
import * as strings from 'FirstVNwpWebPartStrings';

export interface IFirstVNwpWebPartProps {
  description: string;
  multiLiner: string;
  checkboxProp: boolean;
  toggleProp: boolean;
  dropdownProp: string;
}

export default class FirstVNwpWebPart extends BaseClientSideWebPart<IFirstVNwpWebPartProps> {
  /* Wenn Html Template von einem WebPart zu viel HMTL beinhalten, dann kriegt man Intellisense für HTML in einer extra HTML-Datei */
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.firstVNwp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }>Demo Multiliner</p>            
              <p class="${ styles.description }">${escape(this.properties.multiLiner)}</p>
              <p class="${ styles.description }>Übung Checkbox, Dropdown, Toggle</p>
              <p class="${ styles.description }">${this.properties.checkboxProp}</p>
              <p class="${ styles.description }">${escape(this.properties.dropdownProp)}</p>
              <p class="${ styles.description }">${this.properties.toggleProp}</p>
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
                }),
                PropertyPaneTextField('multiLiner', {
                  label: 'label für Multiliner', // todo: Inhalt durch Objekt 'strings' einbeziehen
                  rows: 5,
                  // placeholder: "eingabebeispiel", // entweder placeholder oder value
                  multiline: true,
                  value: 'text' // wenn ein Inhalt von Anfang an da sein muss, kann der nicht nur über Manifest definiert werden, sondern auch durch value
                }),
                PropertyPaneCheckbox('checkboxProp', {
                  text: 'check the box, if you like',
                  checked: true                  
                }),
                PropertyPaneDropdown('dropdownProp', {
                  label: 'Drop it down',
                  options: [
                    {key: '1', text: 'One', index: 1, type: 0},
                    {key: '2', text: 'Two', index: 2 , type: 3},
                    {key: '3', text: 'Three', index: 3, type: 3},
                    {key: '4', text: 'Four', index: 4, type: 0}
                  ]
                }),
                PropertyPaneToggle('toggleProp', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off',
                  checked: true
                })
              ]
            }
          ]
        },
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
