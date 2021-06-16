import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import styles from './AppCustomizer.module.scss';

import * as strings from 'AppCstmzVnApplicationCustomizerStrings';

const LOG_SOURCE: string = 'AppCstmzVnApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppCstmzVnApplicationCustomizerProperties {
  // This is an example; replace with your own property
  // testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppCstmzVnApplicationCustomizer
  extends BaseApplicationCustomizer<IAppCstmzVnApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);

    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }

  private _renderPlaceholders(): void {
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );

    /* 
    todo
    Angezeigt wird:
    "der Platzhalter Top / Bottom wurde nicht gefunden."
     */

    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      )

      if (!this._topPlaceholder) {
        console.error("der Platzhalter Top wurde nicht gefunden.");
        return;
      }

      if (this.properties) {
        let topString = this.properties.Top;
        if (!topString) {
          topString = 'Eigenschaft Top wurde nicht definiert.';
        }

        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}>
          <div class="${styles.top}>
          <i class="ms-Icon ms-Icon--Info"></i>
          ${topString}
          </div></div>
          `
        }
      }
    }

    /* ======== */

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      )

      if (!this._bottomPlaceholder) {
        console.error("der Platzhalter Bottom wurde nicht gefunden.");
        return;
      }

      if (this.properties) {
        let bottomString = this.properties.Bottom;
        if (!bottomString) {
          bottomString = 'Eigenschaft Bottom wurde nicht definiert.';
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div>
          <i class="ms-Icon ms-Icon--Info"></i>
          ${bottomString}
          </div>
          `
        }
      }
    }
  }

  private _onDispose() {
    console.log(' top und bottom placeholders disposed');
  }
}
