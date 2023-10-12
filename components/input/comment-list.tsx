import React from 'react';

import styles from './comment-list.module.css';
import IComment from '@/interfaces/i-comment';

const CommentList = ({ comments }: { comments: IComment[] }) => {
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
