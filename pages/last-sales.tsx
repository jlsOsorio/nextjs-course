import React from 'react';
import useSWR from 'swr';

const LastSalesPage = ({ sales }: { sales: ISales[] }) => {
  const [salesState, setSalesState] = React.useState<ISales[]>(sales);
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

      setSalesState(transformedSales);
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

  if (!data && !salesState) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {salesState?.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}€
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-69065-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
  );
  const data = await response.json();

  const transformedSales: ISales[] = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}
export default LastSalesPage;
