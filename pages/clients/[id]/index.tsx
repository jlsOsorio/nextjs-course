import { useRouter } from 'next/router';
import React from 'react';

const ClientProjectsPage = () => {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler(): void {
    // load data...
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {
        id: 'joao',
        clientprojectid: 'projecta',
      },
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
