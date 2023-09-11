import React from 'react';
import useSWR from 'swr';

const LastSalesPage = () => {
  const [sales, setSales] = React.useState<ISales[]>();
  // const [isLoading, setIsLoading] = useState(false);

  async function fetcherHandler(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  const { data, error } = useSWR(
    'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
    fetcherHandler
  );

  React.useEffect(() => {
    if (data) {
      const transformedSales: ISales[] = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales: ISales[] = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}€
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
