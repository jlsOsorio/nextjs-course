import React from 'react';
import { useRouter } from 'next/router';

const BlogPostsPage = () => {
  const router = useRouter();

  console.log(router.query); // Array de valores dos endpoints (número de endpoints, neste caso, também é dinâmico)

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
};

export default BlogPostsPage;
