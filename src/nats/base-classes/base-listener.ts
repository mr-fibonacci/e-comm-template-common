import { Stan, Message, SubscriptionOptions } from 'node-nats-streaming';
import { Event } from './base-event';
import { Service } from '../services';

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: Service;
  abstract onMessage(data: T['data'], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on('message', (msg: Message) => {
      const parsedData = this.parseMessage(msg);
      console.log(
        `${this.queueGroupName} service received message: ${
          this.subject
        } with data: ${JSON.stringify(parsedData)}`
      );
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message): string {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}
