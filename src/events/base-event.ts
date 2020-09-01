import { Subject } from './subjects';

export interface Event {
  subject: Subject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
