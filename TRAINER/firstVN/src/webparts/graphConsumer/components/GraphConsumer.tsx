import * as React from 'react';
import styles from './GraphConsumer.module.scss';
import { IGraphConsumerProps } from './IGraphConsumerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class GraphConsumer extends React.Component < IGraphConsumerProps, {} > {
  public render(): React.ReactElement<IGraphConsumerProps> {
    return(
      <div className = { styles.graphConsumer } >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>GRAPH CONSUMER</span>
              <p className={styles.description}>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
