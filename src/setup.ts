import mkdirp from 'mkdirp';
import { PROGRESS_FOLDER } from './constants';

export function setup(context = { PROGRESS_FOLDER }) {
  mkdirp.sync(context.PROGRESS_FOLDER)
}
