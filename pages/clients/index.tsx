import React from 'react';
import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    {
      id: 'joao',
      name: 'João',
    },
    {
      id: 'osorio',
      name: 'Osório',
    },
  ];

  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
