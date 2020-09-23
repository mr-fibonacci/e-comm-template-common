import nats, { Stan } from 'node-nats-streaming';
import { Service } from './services';

export class NatsClient {
  constructor(service: Service) {
    this.service = service;
  }
  private _client?: Stan;
  service: Service;

  get client(): Stan {
    if (!this._client) {
      throw new Error(
        `${this.service} service cannot access NATS client before connecting`
      );
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log(`${this.service} service has connected to NATS`);
        resolve();
      });
      this.client.on('error', (err) => {
        console.log(`${this.service} service error: ${err}`);
        reject(err);
      });
    });
  }
}
