import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import StickyMobile from '../Sticky/StickyMobile';
import api from '@/services';
import Loading from '@/components/ui/Loading';
import { useRouter } from 'next/router';
import useCart from '@/hooks/useCart';
import { CartItemType } from '@/store/app/app.type';
import { saveCartOnLocalStorage } from '@/utils/helper';
import useApp from '@/hooks/useApp';
import ManagerModals from '../Modals';
// import { useRouter } from 'next/router';

type ClientLayoutPropsType = {
  children: React.ReactNode;
  meta: React.ReactNode;
};

function ClientLayout(props: ClientLayoutPropsType) {
  const { updateCart, cart } = useCart();
  const { modal, closeModal } = useApp();
  const router = useRouter();
  const { isLoading, isError } = api.useFetchAllCategoryQuery(undefined, {
    refetchOnFocus: false,
  });
  api.useFetchAllBrandsQuery(undefined, {
    skip: isError,
    refetchOnFocus: false,
  });

  api.useGetUserDetailQuery(undefined, {
    skip: isError,
    refetchOnFocus: false,
  });
  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem('cart');
    if (cartInLocalStorage && cartInLocalStorage.length > 0) {
      const cart: CartItemType[] = JSON.parse(cartInLocalStorage) || [];
      updateCart(cart);
    }
  }, []);

  useEffect(() => {
    if (modal.isOpen) closeModal();
  }, [router.asPath]);
  useEffect(() => {
    saveCartOnLocalStorage(cart);
  }, [cart]);

  // const router = useRouter();
  // const { isLoading, isError } = api.useGetProductByIdQuery('60c1c1b0b0c9b8a0b4b0');
  // if (isError) {
  //   router.push('/404');
  // }
  if (isLoading) return <Loading />;

  return (
    <div className='app'>
      {props.meta}
      <Header />
      <main>{props.children}</main>
      <Footer />
      {router.pathname.includes('/products') ? <StickyMobile /> : null}
      <ManagerModals />
    </div>
  );
}

export default ClientLayout;
