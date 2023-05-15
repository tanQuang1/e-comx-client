import CustomToast from '@/components/ui/Toast';
import { store } from '@/store';
import '@/styles/global.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <CustomToast />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
