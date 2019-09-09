import {combineReducers} from 'redux';

import { sings } from './sings';
import { comments } from './comments';
import { singers } from './singers';
import { users } from './users';

export const reducer = combineReducers({
    sings,
    comments,
    singers,
    users,
});
