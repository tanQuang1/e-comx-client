// import ClientLayout from '@/components/shared/Layout/ClientLayout';
import CheckoutTemplate from '@/components/pages/Checkout';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';

export default function Home() {
  return (
    <ClientLayout meta={<Meta title='Checkout page' description='Lorem ipsum' />}>
      <CheckoutTemplate />
    </ClientLayout>
  );
}
