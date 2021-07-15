import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TypeScriptVnWebPart.module.scss';
import * as strings from 'TypeScriptVnWebPartStrings';

export interface ITypeScriptVnWebPartProps {
  description: string;
}

export default class TypeScriptVnWebPart extends BaseClientSideWebPart<ITypeScriptVnWebPartProps> {

  todo: any = {title: 'initial title'};

  constructor() {
    super();
    console.log('ctor ausgeführt');
  }

  onInit() {
    console.log('web part initialisiert');
    fetch('https://jsonplaceholder.typicode.com/todos/1') // todo: Daten kommen später an, als sie angezeigt werden
      .then(response => response.json())
      .then(json => this.todo = json)
    return new Promise<void>(resolve => resolve());
  }

  public render(): void {
    console.log('render ausgeführt')
    this.domElement.innerHTML = `
      <div class="${styles.typeScriptVn}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <p class="${styles.subTitle}">Einführung zu TypeScript</p>
              <p class="${styles.description}">${escape(this.properties.description)}</p>
              <p class="${styles.description}">${this.todo.title}</p>
            </div>
          </div>
        </div>
      </div>`;
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
