import * as React from 'react';
import styles from './ReactWpVn.module.scss';
import { IReactWpVnProps } from './IReactWpVnProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactWpVn extends React.Component < IReactWpVnProps, {} > {
  public render(): React.ReactElement<IReactWpVnProps> {
    return(
      <div className = { styles.reactWpVn } >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <p className={styles.description}>obstauswahl: {escape(this.props.obstauswahl)}</p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
