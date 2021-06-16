import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GraphConsumerWebPartStrings';
import GraphConsumer from './components/GraphConsumer';
import { IGraphConsumerProps } from './components/IGraphConsumerProps';
// import { MSGraphClient } from '@microsoft/sp-http'; // ist ab spfx v1.6.0 verfügbar
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export interface IGraphConsumerWebPartProps {
  description: string;
  clientMode: ClientMode;
}

export enum ClientMode {
  aad,
  graph
}

export default class GraphConsumerWebPart extends BaseClientSideWebPart<IGraphConsumerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphConsumerProps > = React.createElement(
      GraphConsumer,
      {
        description: this.properties.description,
        clientMode: this.properties.clientMode,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getdataVersion(): Version {
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
                PropertyPaneDropdown('clientMode', {
                  label: 'client mode',
                  options: [
                    { key: ClientMode.aad, text: 'AadHttpClient'},
                    { key: ClientMode.graph, text: 'MSGraphClient'}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
