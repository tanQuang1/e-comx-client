import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';
import Button from '@/components/ui/Button';
import { Icon } from '@iconify/react';
import Accordion from '@/components/ui/Accordion';
import Loading from '@/components/ui/Loading';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { useState } from 'react';
import { ProductDetailData } from '@/temp/ProductDetailData';
import TextField from '@/components/ui/TextField';
import Modal from '@/components/ui/Modal';
import { APP_ICONS } from '@/utils/app-config';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import { categories } from '@/temp/Categories';
import ProductDetail from '@/components/shared/Modals/ProductDetail/ProductDetail';
import QuantityTextField from '@/components/ui/QuantityTextField';
import { toast } from 'react-toastify';
import api from '@/services';
import Link from 'next/link';
const accordionList = [
  {
    id: 1,
    header: 'header1',
    children: 'children 1',
  },
  {
    id: 2,
    header: 'header2',
    children: 'children 2',
  },
];
export default function Home() {
  const { isLoading, data } = api.useFetchAllProductQuery({ limit: 12 });

  console.log(data);
  // const { isLoading } = api.useFetchAllProductQuery();

  // quantity textfield
  const [quantity, setQuantity] = useState<number>(0);

  const [select, setSelect] = useState<string>('');
  const handleSelect = (value: string) => {
    setSelect(value);
  };
  const [accordionIndexes, setAccordionIndexes] = useState<number[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  //modal right
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const toggleAccordion = (index: number) => {
    if (accordionIndexes.includes(index)) {
      setAccordionIndexes(accordionIndexes.filter((item) => item !== index));
    } else {
      setAccordionIndexes([...accordionIndexes, index]);
    }
  };
  //
  function handleChangeValue(value: number) {
    setQuantity(value);
  }
  // useEffect(() => {
  //   let time: NodeJS.Timeout;
  //   if (isLoading) {
  //     time = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000);
  //   }
  //   return () => clearTimeout(time);
  // }, [isLoading]);

  return (
    <ClientLayout meta={<Meta title='Home page' description='Lorem ipsum' />}>
      <h1>Test Component here</h1>
      <Link href='/'>Home</Link>
      <section className='components'>
        <div className='components__items '>
          <p className='title'>Toast</p>
          <div className='grid'>
            <Button size='lg' color='quaternary' onClick={() => toast('Wow so easy!')}>
              Default
            </Button>
            <Button size='lg' color='quaternary' onClick={() => toast.error('Wow so easy!')}>
              Error
            </Button>
            <Button size='lg' color='quaternary' onClick={() => toast.success('Wow so easy!')}>
              Success
            </Button>
            <Button size='lg' color='quaternary' onClick={() => toast.info('Wow so easy!')}>
              Info
            </Button>
            <Button size='lg' color='quaternary' onClick={() => toast.warn('Wow so easy!')}>
              Warning
            </Button>
          </div>
        </div>
        <div className='components__items '>
          <p className='title'>Button</p>

          <Button size='lg'>Button Primary lg</Button>
          <Button color='secondary'>Button Secondary md</Button>
          <Button color='tertiary' variant='outlined' size='lg'>
            Button Tertiary
          </Button>
          <Button color='quaternary' size='lg'>
            Button Quaternary
          </Button>
          <Button color='quinary' size='lg'>
            Button Quinary
          </Button>
          <Button disabled size='lg'>
            Button Disable
          </Button>
          <Button size='icon' color='secondary'>
            <Icon icon='mdi:cards-heart-outline' />
          </Button>
        </div>
        <div className='components__items '>
          <p className='title'>Accordion</p>
          {accordionList.map((accordion, accordionIndex) => (
            <Accordion
              key={accordion.id}
              open={accordionIndexes.includes(accordionIndex)}
              onClick={() => toggleAccordion(accordionIndex)}
              header={accordion.header}
            >
              {accordion.children}
            </Accordion>
          ))}
        </div>
        <div className='components__items'>
          {/* <p className='title' onClick={() => setIsLoading(true)}>
            Loading{' '}
          </p> */}
          {isLoading && <Loading />}
        </div>
        <div className='components__items special'>
          <p className='title'>ProductCard </p>
          {data && (
            <div className='grid'>
              <ProductCard openModal={toggleModal} product={data.products.slice(0, 1)[0]} />
              <ProductCard openModal={toggleModal} product={data.products.slice(0, 1)[0]} />
              <ProductCard openModal={toggleModal} product={data.products.slice(0, 1)[0]} />
            </div>
          )}
        </div>
        <div className='components__items'>
          <p className='title'>Modal </p>
          <div>
            <h2>
              Su dung attribute 'placement' de chon vi tri xuat hien : top - right - center - left
            </h2>
            <button onClick={toggleModal}>Modal top</button>
          </div>
        </div>
        <div className='components__items '>
          <p className='title'>Barges </p>
          <div className='barges'>
            <Icon width={20} height={20} icon={APP_ICONS.heart} />
            <Badge value={3} size='sm' />
          </div>
        </div>
        <div className='components__items '>
          <p className='title'>TextField </p>
          <TextField
            label='Text Field Medium '
            required
            placeholder='test'
            error
            helperText='Required'
          />
          <TextField
            label='Text Field Small '
            required
            placeholder='test'
            error
            variant='small'
            labelPosition='inline'
            helperText='Required'
          />
        </div>
        <div className='components__items '>
          <p className='title'>Select box </p>
          <div style={{ width: '300px' }}>
            <Select maxWidth options={categories} value={select} onSelect={handleSelect} />
          </div>
        </div>
        <div className='components__items'>
          <p className='title'>Quantity TextField </p>
          <div style={{ width: '10rem' }}>
            <p>Size : small</p>
            <QuantityTextField size='sm' quantity={quantity} onChange={handleChangeValue} />
            <p>Size : Medium</p>
            <QuantityTextField quantity={quantity} onChange={handleChangeValue} />
          </div>
        </div>
      </section>

      {/* modal */}

      {isOpenModal && (
        <Modal open={isOpenModal} onClose={toggleModal} placement='center'>
          <ProductDetail onClose={toggleModal} productId={ProductDetailData._id} />
        </Modal>
      )}
    </ClientLayout>
  );
}
