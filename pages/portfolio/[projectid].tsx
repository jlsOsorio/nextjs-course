import React from 'react';
import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query); // Objecto que tem como key o placeholder (projectid), e value o valor a ele associado.

  // Enviar um pedido para um backend server, para fazer fetch de informação associada ao id de router.query.projectid

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;
