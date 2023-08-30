import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from 'path';
import fs from 'fs/promises';
import React from 'react';
import { IProduct } from '@/interfaces/i-products';

const ProductDetailPage = (props: { loadedProduct?: IProduct }) => {
  const { loadedProduct } = props;

  return (
    loadedProduct && (
      <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
      </>
    )
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data: { products: IProduct[] } = JSON.parse(jsonData.toString());

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { pid: 'p1' },
      },
      {
        params: { pid: 'p2' },
      },
      {
        params: { pid: 'p3' },
      },
    ],
    fallback: false,
  };
};

export default ProductDetailPage;
