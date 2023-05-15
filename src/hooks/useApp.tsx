import { RootState } from '@/store';
import { updateModal } from '@/store/app/app.slice';
import { ModalNameEnum } from '@/store/app/app.type';

import { useDispatch, useSelector } from 'react-redux';

export default function useApp() {
  const modal = useSelector((state: RootState) => state.app.modal);
  const dispatch = useDispatch();

  function openModal(name: ModalNameEnum) {
    dispatch(updateModal({ isOpen: true, name }));
  }
  function closeModal() {
    dispatch(updateModal({ isOpen: false, name: ModalNameEnum.EMPTY }));
  }
  return {
    modal,
    openModal,
    closeModal,
  };
}
