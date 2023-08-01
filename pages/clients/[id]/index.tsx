import { useRouter } from 'next/router';
import React from 'react';

const ClientProjectsPage = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>The Projects of a Given Client</h1>
    </div>
  );
};

export default ClientProjectsPage;
