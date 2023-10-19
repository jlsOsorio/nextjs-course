import React from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import IComment from '@/interfaces/i-comment';
import NotificationContext from '@/store/notification.context';
import Loading from '../ui/loading';

const Comments = ({ eventId }: { eventId: string }) => {
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [loading, setLoading] = React.useState(false);
  const notificationCtx = React.useContext(NotificationContext);

  React.useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }

          const data = await res.json();
          setLoading(false);
          throw new Error(data.message || 'Something went wrong!');
        })
        .then((json) => {
          setComments(json.comments);
          setLoading(false);
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
          });
        });
    }
  }, [eventId, showComments, notificationCtx]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: IComment) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }

        const data = await res.json();
        throw new Error(data.message || 'Something went wrong!');
      })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList comments={comments} />}
      {showComments && loading && <Loading loadingText="Loading comments..." />}
    </section>
  );
};

export default Comments;
