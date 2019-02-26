import {combineReducers} from 'redux';

import { sings } from './sings';
import { comments } from './comments';

export const reducer = combineReducers({
    sings,
    comments,
});