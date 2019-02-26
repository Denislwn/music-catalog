import { dataBase } from '../components/Root';
import { COMMENTS_TABLE } from '../constans';

export class CommentFinder {
    static getCommentList() {
        return dataBase.queryAll(COMMENTS_TABLE);
    }

    static getComment(options) {
        return dataBase.queryAll(COMMENTS_TABLE, options);
    }
}