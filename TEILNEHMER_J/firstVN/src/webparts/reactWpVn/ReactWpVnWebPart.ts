import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactWpVnWebPartStrings';
import ReactWpVn from './components/ReactWpVn';
import { IReactWpVnProps } from './components/IReactWpVnProps';

export interface IReactWpVnWebPartProps {
  description: string;
  dropdownProp: string;
}

export default class ReactWpVnWebPart extends BaseClientSideWebPart<IReactWpVnWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactWpVnProps> = React.createElement(
      ReactWpVn,
      {
        description: this.properties.description,
        obstauswahl: this.properties.dropdownProp
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
                }),
                PropertyPaneDropdown('dropdownProp', {
                  label: 'Drop it down',
                  options: [
                    {key: 'Apfel', text: 'Apfel', index: 1},
                    {key: 'Birne', text: 'Birne', index: 2},
                    {key: 'Banane', text: 'Banane', index: 3},
                    {key: 'Nektarine', text: 'Nektarine', index: 4}
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
