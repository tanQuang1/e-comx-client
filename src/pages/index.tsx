// import ClientLayout from '@/components/shared/Layout/ClientLayout';
import HomeTemplate from '@/components/pages/Home/Home';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';

export default function Home() {
  return (
    <ClientLayout meta={<Meta title='Home page' description='Lorem ipsum' />}>
      <HomeTemplate />
    </ClientLayout>
  );
}
