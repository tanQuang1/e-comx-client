import ContactTemplate from '@/components/pages/Contact/ContactTemplate';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';

export default function Contact() {
  return (
    <ClientLayout meta={<Meta title='Contact' description='Contact-us' />}>
      <ContactTemplate />
    </ClientLayout>
  );
}
