import { Version, EnvironmentType, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ContextVnWebPart.module.scss';
import * as strings from 'ContextVnWebPartStrings';

export interface IContextVnWebPartProps {
  description: string;
}

export default class ContextVnWebPart extends BaseClientSideWebPart<IContextVnWebPartProps> {

  onInit() {
    console.log('web part initialisiert');
    console.log('this.context :>>', this.context);
    console.log('this.context.httpClient :>>', this.context.httpClient);
    console.log('this.context.spHttpClient :>>', this.context.spHttpClient);
    console.log('this.context.pageContext :>>', this.context.pageContext);
    console.log('this.context.pageContext.site :>>', this.context.pageContext.site);
    console.log('this.context.pageContext.user :>>', this.context.pageContext.user);
    console.log('this.context.pageContext.web :>>', this.context.pageContext.web);
    console.log('this.context.pageContext.web.title :>>', this.context.pageContext.web.title);
    console.log('this.context.pageContext.web.id :>>', this.context.pageContext.web.id);
    console.log('this.context.pageContext.web.description :>>', this.context.pageContext.web.description);
    console.log('this.context.pageContext.web.templateName :>>', this.context.pageContext.web.templateName);
    console.log('this.context.pageContext.list :>>', this.context.pageContext.list);
    console.log('this.context.pageContext.listItem :>>', this.context.pageContext.listItem);
    console.log('Environment.type :>> ', Environment.type)

    return new Promise<void>(resolve => resolve());
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.contextVn }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }">this.context.pageContext.web.title: ${escape(this.context.pageContext.web.title)}</p>
              <p class="${ styles.description }">is env local?: ${ Environment.type === EnvironmentType.Local ? 'local env' : 'NOT a local env'}</p>
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
