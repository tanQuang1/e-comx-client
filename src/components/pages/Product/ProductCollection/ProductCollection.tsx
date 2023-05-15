import ProductDetail from '@/components/shared/Modals/ProductDetail/ProductDetail';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { ProductDataType } from '@/types/product.type';
import { useEffect, useState } from 'react';

interface ProductCollectionProps {
  column: string;
  currentData?: ProductDataType[];
  onChangeLoadMoreTime: () => void;
  totalProductFetched: number;
  totalProduct: number | undefined;
  btnLoadMoreDisabled: boolean;
  loading: boolean;
}
type ProductDetailModalType = {
  open: boolean;
  id: string;
};
export default function ProductCollection(props: ProductCollectionProps) {
  const { column, currentData, onChangeLoadMoreTime, btnLoadMoreDisabled, loading } = props;
  const [btnLoading, setBtnLoading] = useState(false);
  const [modal, setModal] = useState<ProductDetailModalType>({ open: false, id: '' });

  useEffect(() => {
    setBtnLoading(false);
  }, [currentData]);
  const handleOpenModal = (id: string) => {
    setModal({
      open: true,
      id,
    });
  };
  const handleCloseModal = () => {
    setModal({ ...modal, open: false });
  };
  const handleBtnLoadMore = () => {
    onChangeLoadMoreTime();
    setBtnLoading(true);
  };

  return (
    <>
      {loading ? (
        <Loading position='absolute' />
      ) : (
        <>
          <div className={`product__box ${column}`}>
            {currentData &&
              currentData.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  openModal={() => handleOpenModal(product._id)}
                  showAvailable={column === 'detail'}
                />
              ))}
          </div>
          {btnLoadMoreDisabled && (
            <div className='btn--box'>
              {!btnLoading && (
                <Button className='btn--more' size='lg' onClick={handleBtnLoadMore}>
                  Load more
                </Button>
              )}
            </div>
          )}
          <div className='btn--box'>{btnLoading && <Loading size='sm' position='none' />}</div>
          {!btnLoadMoreDisabled && !btnLoading && (
            <p className='none-item'>You've reached the end of item.</p>
          )}
          {modal.open && (
            <Modal open={modal.open} onClose={handleCloseModal} placement='center'>
              <ProductDetail onClose={handleCloseModal} productId={modal.id} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}
