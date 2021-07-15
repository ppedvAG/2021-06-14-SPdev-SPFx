import * as React from 'react';
import styles from './TermineVn.module.scss';
import { ITermineVnProps } from './ITermineVnProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Termin from './Termin';

export default class TermineVn extends React.Component < ITermineVnProps, {} > {
  public render(): React.ReactElement<ITermineVnProps> {
    console.log('this.props.termine: ', this.props.termine)
    return(
      <div className = { styles.termineVn } >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>Description: {escape(this.props.description)}</p>
              <h2>Termine</h2>
              <table id="termineTabelle">
                {/* Meldung von React: ohne tbody ist html nicht valide */}
                <tbody>
                {this.props.termine.map(termin => {
                  return (<Termin key={termin.Id} Title={termin.Title} Datum={termin.Datum} Id={termin.Id}/>)
                })}
                </tbody>
              </table>              
            </div>
          </div>
        </div>
      </div >
    );
  }
}
