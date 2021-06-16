import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'GraphConsumerKbWebPartStrings';
import GraphConsumerKb from './components/GraphConsumerKb';
import { IGraphConsumerKbProps } from './components/IGraphConsumerKbProps';
import { ClientMode } from './components/ClientMode';

export interface IGraphConsumerKbWebPartProps {
  clientMode: ClientMode;
}

export default class GraphConsumerKbWebPart extends BaseClientSideWebPart<IGraphConsumerKbWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphConsumerKbProps > = React.createElement(
      GraphConsumerKb,
      {
      clientMode: this.properties.clientMode,
      context: this.context,
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
                PropertyPaneChoiceGroup('clientMode', {
                  label: strings.ClientModeLabel,
                  options: [
                    { key: ClientMode.aad, text: "AadHttpClient"},
                    { key: ClientMode.graph, text: "MSGraphClient"},
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
