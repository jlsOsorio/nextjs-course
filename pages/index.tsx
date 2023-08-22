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

  if (!data) {
    return {
      redirect: {
        destination: '/no-data', // Exemplo de redirect page quando não for possível conectar ao servidor
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true, // Exemplo a mostrar página 404 quando não existe produtos para serem mostrados
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // O número (em segundos) diz de quanto em quanto tempo se pretende que a página seja gerada novamente. Isto no ambiente de desenvolvimento não importa porque, sempre que actualizamos a página, a framework irá sempre correr este método. No entanto, em produção, o cenário é bem diferente: como a página estática com conteúdo dinâmico (de acordo com o getStaticProps) é gerada no processo de build do projecto, se não houver a propriedade "revalidate", o conteúdo estático será sempre o mesmo. Assim, o "revalidate" obriga a fazer (em produção) uma nova geração da própria página, com base no conteúdo mais actualizado no lado do servidor.
  };
}

export default HomePage;
