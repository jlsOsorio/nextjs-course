import React, { useState } from 'react';

const LastSalesPage = () => {
  const [sales, setSales] = React.useState<ISales[]>();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales: ISales[] = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    <p>No data yet...</p>; // Apesar de ter o useEffect para fazer o fetch no client-side, o NextJS faz, ainda assim, a pré-renderização. Ao fazê-lo, vai ignorar todo o código inserido no useEffect (inicialmente), renderizando toda a base da página, sendo necessário verificar a existência de dados e, como parte integrante e fundamental ao estudo da framework, será este código que irá ser mostrado no código fonte da página, já que esta condição que será verificada no momento da pré-renderização (isLoading = false; sales = undefined)
  }

  return (
    sales && (
      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume}€
          </li>
        ))}
      </ul>
    )
  );
};

export default LastSalesPage;
