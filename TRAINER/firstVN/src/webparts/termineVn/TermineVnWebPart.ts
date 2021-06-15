import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TermineVnWebPartStrings';
import TermineVn from './components/TermineVn';
import { ITermineVnProps } from './components/ITermineVnProps';
import { override } from '@microsoft/decorators';
import ITermin from './components/ITermin';
import { SPHttpClient } from '@microsoft/sp-http';

export interface ITermineVnWebPartProps {
  description: string;
}

export default class TermineVnWebPart extends BaseClientSideWebPart<ITermineVnWebPartProps> {

  // private _termine: ITermin[] = [{ Title: 'test', Datum: new Date(), Id: 1 }];
  private _termine: ITermin[] = [];

  public render(): void {
    const element: React.ReactElement<ITermineVnProps> = React.createElement(
      TermineVn,
      {
        description: this.properties.description,
        termine: this._termine
      }
    );
    ReactDom.render(element, this.domElement);
    // this._onGetTermine();
  }

  @override
  onInit(): Promise<void> {
    this._onGetTermine();
    return new Promise<void>(resolve => { return resolve() });
  }

  private _onGetTermine() {
    this._getTermine()
      .then(inhaltAusPromise => {
        console.log('inhaltAusPromise: ', inhaltAusPromise); // inhaltAusPromise:  (3) [{…}, {…}, {…}], das Array ist da
        this._termine = inhaltAusPromise;
        this.render();
      })
  }

  private _getTermine(): Promise<ITermin[]> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Termine')/items?select=Id, Title, Datum`, SPHttpClient.configurations.v1)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.value)
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
