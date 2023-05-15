import CartTemplate from '@/components/pages/Cart/CartTemplate';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';
import React from 'react';

const cart = () => {
  return (
    <ClientLayout meta={<Meta title='product page' description='Lorem ipsum' />}>
      <CartTemplate />
    </ClientLayout>
  );
};

export default cart;
