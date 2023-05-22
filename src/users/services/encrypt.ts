import { key } from '../../App';

const {
    createHmac,
  } = await import('node:crypto');

export function encrypt(data: string) {
    return createHmac('sha256', key).update(data).digest("hex");
}
