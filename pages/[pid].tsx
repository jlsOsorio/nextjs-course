import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from 'path';
import fs from 'fs/promises';
import React from 'react';
import { IProduct } from '@/interfaces/i-products';

const ProductDetailPage = (props: { loadedProduct?: IProduct }) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  } // Quando se coloca o "fallback" a true, dizemos que, mesmo que os endpoints não estejam definidos no getStaticPaths, eles devem poder ser acedidos na mesma. A diferença é que o conteúdo destas páginas "não definidas" não é pre-fetched. Por isso deve ter-se em conta o fallback e prevenir essa situação (ou, caso se faça um novo pedido, i.e., por exemplo, não se carregue directamente no link, mas se escreva o endpoint no url, surgirá um erro porque o "loadedProduct" não foi instantaneamente preparado aquando da renderização desta página), Neste caso dizemos que, enquanto não existe conteúdo no "loadedProduct", aparece um parágrafo com o texto "Loading..." Caso se use o fallback: 'blocking', esta prevenção não será necessária, já que o NextJS espera que a página esteja totalmente pré-gerada do lado do servidor antes de a servir.

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
    fallback: false,
  };
};

export default ProductDetailPage;
