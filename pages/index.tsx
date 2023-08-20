import React from 'react';

import path from 'path';
import fs from 'fs/promises';
import { IProduct } from '@/interfaces/i-products';

const HomePage = (props: { products: IProduct[] }) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // cwd = Current Working Directory. Quando o NextJS intepreta esta função, o ficheiro onde está situada a getStaticProps não será estruturalmente interpretado como um ficheiro dentro de "pages", mas a nível global, na pasta raíz (processo que acontece quando o NextJS compila o projecto), daí que o cwd neste caso será a raíz do próprio projecto, e não "pages"

  const jsonData = await fs.readFile(filePath);
  const data: { products: IProduct[] } = JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
