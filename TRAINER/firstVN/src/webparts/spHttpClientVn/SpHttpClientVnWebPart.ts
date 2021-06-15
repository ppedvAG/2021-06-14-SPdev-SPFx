import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import styles from './SpHttpClientVnWebPart.module.scss';
import * as strings from 'SpHttpClientVnWebPartStrings';

export interface ISpHttpClientVnWebPartProps {
  description: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export default class SpHttpClientVnWebPart extends BaseClientSideWebPart<ISpHttpClientVnWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.spHttpClientVn }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p>Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <h2>Hard codiertes HTML</h2>
              <div id="textJeNachEnv"></div>
              <h2>Asynchron erstelltes HTML</h2>
              <div id="platzFuerAsyncDaten"></div>
            </div>
          </div>
        </div>
      </div>`;
      this._holeDenRestHtml();
      this._eineMethodenVariable();
  }

  /* Varianten für Klassenmethoden */
  /* pfeilfunktionen gehen anders mit dem Schlüsselwort 'this' um */
  private _eineMethodenVariable = () => {
    console.log('methode als property angelegt');
  }

  private _holeDenRestHtml() {
    const textJeNachEnv: Element = this.domElement.querySelector('#textJeNachEnv');
    if (Environment.type === EnvironmentType.Local) {
      textJeNachEnv.innerHTML = `
      <h2>Inhalte für Lokal</h2>
      <p>Im lokalen Env kann Context-Objekt anders befüllt werden.</p>
      <p>Je nach Env können versch. Aktionen ausgeführt werden.</p>
      `;
      /* 
      lokale TestDaten holen */
    } else if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      textJeNachEnv.innerHTML = `
      <h2>Inhalte für SP env</h2>
      <p>Im SP Env kann Context-Objekt anders befüllt werden.</p>
      `;
      this._getSPLists().then(response => this._buildAsyncHtml(response.value))
    }
  }

  private _getSPLists(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists', SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {return response.json()})
  }

  private _buildAsyncHtml(lists: ISPList[]) {
    let htmlString = '<ol>';
    lists.forEach(list => {
      console.log('list.Title: ', list.Title)
      console.log('list: ', list)
      htmlString += `
      <li>${list.Title}</li>`
    })
    htmlString += '</ol>';
    const platzFuerAsyncDaten = this.domElement.querySelector('#platzFuerAsyncDaten');
    platzFuerAsyncDaten.innerHTML = htmlString;
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
