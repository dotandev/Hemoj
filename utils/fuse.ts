import { IFuseOptions } from 'fuse.js';
import { Emoji } from '../generated/prisma';

export const fuseOptions: IFuseOptions<Emoji> = {
  keys: ['label', 'shortcodes', 'keywords'],
  threshold: 0.3,
};
