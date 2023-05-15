import ProductTemplate from '@/components/pages/Product/ProductTemplate';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';
import { useRouter } from 'next/router';
import React from 'react';

export default function Product() {
  const {
    query: { pageName },
  } = useRouter();

  return (
    <ClientLayout
      meta={
        <Meta
          title={`All Products ${pageName ? 'of ' + pageName : ''}`}
          description='Lorem ipsum'
        />
      }
    >
      <ProductTemplate />
    </ClientLayout>
  );
}
