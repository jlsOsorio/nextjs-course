import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from 'path';
import fs from 'fs/promises';
import React from 'react';
import { IProduct } from '@/interfaces/i-products';

const ProductDetailPage = (props: { loadedProduct?: IProduct }) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  } // Com fallback a true e sem qualquer outro cenário onde haja outro pid que não esteja no dummy-backend, a aplicação mostrará um erro na falha do fetch da static prop. Assim, deve ser necessário tratar o erro, dizendo no "getStaticProps" para se comportar de determinada maneira (no caso, mostrar página 404), caso não encontre definitivamente o pid pretendido.

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data: { products: IProduct[] } = JSON.parse(jsonData.toString());

  return data;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  } // Comportamento pretendido, caso não encontre pid desejado.

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true, // Um pid que não esteja no ficheiro dummy_backend pode ainda ser um pid com informação válida, pelo que se definiu o fallback de modo a que, mesmo não havendo pid no dummy-backend, o NextJS tente renderizar na mesma.
  };
};

export default ProductDetailPage;
