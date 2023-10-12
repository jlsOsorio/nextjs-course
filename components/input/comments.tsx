import React from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import IComment from '@/interfaces/i-comment';

const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((json) => setComments(json.comments));
  }, [eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: IComment) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((json) => {
        setComments([...comments, json.comment]);
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && comments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
