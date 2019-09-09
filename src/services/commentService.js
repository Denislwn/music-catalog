import {CommentFinder} from "../finders/CommentFinder";
import {CommentGateway} from "../gateways/CommentGateway";

export class CommentService {
    static getCommentList() {
        return CommentFinder.getCommentList();
    }

    static addNewComment(newCommentData) {
        const commentGateway = new CommentGateway(
            newCommentData.text,
            newCommentData.creatorId,
        );

        return commentGateway.addNewComment();
    }

    static editComment = (newCommentData) => {
        const commentGateway = new CommentGateway(
            newCommentData.text,
            newCommentData.data,
        );

        return commentGateway.editComment(newCommentData.ID);
    };

    static deleteComment = (commentId) => {
        return CommentGateway.deleteComment(commentId);
    }
}
