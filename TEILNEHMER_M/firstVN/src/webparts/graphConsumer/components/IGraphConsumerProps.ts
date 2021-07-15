import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ClientMode } from "../GraphConsumerWebPart";

export interface IGraphConsumerProps {
  description: string;
  clientMode: ClientMode;
  context: WebPartContext;
}
