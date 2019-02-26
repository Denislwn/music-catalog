import {COMMENTS_TABLE} from "../constans";
import { dataBase } from "../components/Root";
import {CommentFinder} from "../finders/CommentFinder";

export class CommentGateway {
    constructor(text) {
        this.text = text;
        this.date = new Date();
    }

    addNewComment() {
        const newCommentId = dataBase.insert(COMMENTS_TABLE, {
            text: this.text,
            date: this.date,
        });
        dataBase.commit();

        return CommentFinder.getComment( { query: { ID: newCommentId }})[0];
    }

    editComment(commentID) {
        const result = dataBase.update(COMMENTS_TABLE, {ID: commentID}, (row) => {
            row.text = this.text;
            row.date = this.date;

            return row;
        });

        dataBase.commit();

        if (result) {
            return CommentFinder.getComment( { query: { ID: commentID }})[0];
        }
    }

    static deleteComment(commentId) {
        const result = dataBase.deleteRows(COMMENTS_TABLE, {ID: commentId});

        dataBase.commit();

        return result
    }
}