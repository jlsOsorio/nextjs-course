import React from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';

const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = React.useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: any) {
    // send data to API
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
