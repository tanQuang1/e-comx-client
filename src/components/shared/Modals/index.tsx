import Modal from '@/components/ui/Modal';
import useApp from '@/hooks/useApp';
import { ModalNameEnum, ModalPlacementEnum } from '@/store/app/app.type';
import React from 'react';
import Cart from './Cart';
import LoginRegister from './LoginRegister';
import NavbarMobile from '../Header/Navbar/Mobile/NavbarMobile';

function ManagerModals() {
  const { modal, closeModal } = useApp();
  return (
    <>
      {modal.name === ModalNameEnum.CART && (
        <Modal open={modal.isOpen} onClose={closeModal} placement={ModalPlacementEnum.RIGHT}>
          <Cart onClose={closeModal} />;
        </Modal>
      )}
      {modal.name === ModalNameEnum.AUTH && (
        <Modal open={modal.isOpen} onClose={closeModal} placement={ModalPlacementEnum.TOP}>
          <LoginRegister open={modal.isOpen} onClose={closeModal} />;
        </Modal>
      )}
      {modal.name === ModalNameEnum.WISH_LIST && (
        <Modal open={modal.isOpen} onClose={closeModal} placement={ModalPlacementEnum.CENTER}>
          <p style={{ width: '20rem' }}>Favorite</p>;
        </Modal>
      )}
      {modal.name === ModalNameEnum.MENU_BAR_MOBILE && (
        <Modal open={modal.isOpen} onClose={closeModal} placement='left'>
          <NavbarMobile />
        </Modal>
      )}
    </>
  );
}

export default React.memo(ManagerModals);
