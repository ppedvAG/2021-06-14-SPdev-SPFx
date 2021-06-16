import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ClientMode } from './ClientMode';

export interface IGraphConsumerKbProps {
  clientMode: ClientMode;
  context: WebPartContext;
}
