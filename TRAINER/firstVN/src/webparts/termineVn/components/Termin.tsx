import * as React from 'react';
import styles from './TermineVn.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import ITerminProps from './ITermin';

export default class Termin extends React.Component<ITerminProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.Title}</td>
                <td>{this.props.Datum.toString()}</td>
            </tr>
        )
    }
}