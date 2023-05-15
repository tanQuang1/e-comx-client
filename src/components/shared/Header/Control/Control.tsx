import Barges from '@/components/ui/Badge';
import { Icon } from '@iconify/react';
import React from 'react';
import useCart from '@/hooks/useCart';
import useUser from '@/hooks/useUser';
import useApp from '@/hooks/useApp';
import { ModalNameEnum } from '@/store/app/app.type';
import { APP_ICONS } from '@/utils/app-config';

// type ActionType = {
//   type: 'OPEN' | 'CLOSE';
//   payload: ModalNameEnum;
// };
// const modalInitialState: ModalInitialStateType = {
//   isOpen: false,
//   name: ModalNameEnum.EMPTY,
// };
// function reducer(state: ModalInitialStateType, action: ActionType): ModalInitialStateType {
//   switch (action.type) {
//     case 'OPEN':
//       return {
//         isOpen: true,
//         name: action.payload,
//       };
//     case 'CLOSE':
//       return {
//         ...state,
//         isOpen: false,
//       };

//     default:
//       return state;
//   }
// }

function Control() {
  const { calculateAmountProductsInCart, calculateTotalPriceOfCart } = useCart();
  const { openModal } = useApp();
  const {
    user: { userDetail },
    logout,
  } = useUser();

  return (
    <>
      <ul className='header__control'>
        <li
          className='control__barges control__account--icon'
          onClick={userDetail ? () => {} : () => openModal(ModalNameEnum.AUTH)}
        >
          <a href='#' className='control__link' title='Login/Register'>
            {!userDetail ? (
              <>
                <Icon
                  className='control__icon'
                  icon={APP_ICONS.account}
                  width={35}
                  height={35}
                  color='white'
                />
                <div className='control__text'>
                  <span className='control__text--1'>Login</span>
                  <span className='control-text--2'>Login/Register</span>
                </div>
              </>
            ) : (
              <div className='control__text'>
                <>
                  <span className='control__text--1'>{userDetail?.username}</span>
                  <span className='control-text--2' onClick={logout}>
                    Log out
                  </span>
                </>
              </div>
            )}
          </a>
        </li>
        <li
          className='barges control__heart--icon'
          onClick={() => openModal(ModalNameEnum.WISH_LIST)}
        >
          <a href='#' className='control__link' title='Wishlist'>
            <div className='control__icon'>
              <Icon icon={APP_ICONS.heart} width={35} height={35} color='white' />
              <Barges value={2} size='md' />
            </div>
            <div className='control__text'>
              <span className='control__text--1 control__text--display'>Favorite</span>
              <span className='control-text--2'>My Wishlist</span>
            </div>
          </a>
        </li>
        <li className=' control__shopping--icon' onClick={() => openModal(ModalNameEnum.CART)}>
          <a href='#' className='control__link' title='Your Cart'>
            <div className='control__icon'>
              <Icon icon={APP_ICONS.shoppingBag} width={35} height={35} color='white' />
              <Barges value={calculateAmountProductsInCart()} size='md' />
            </div>
            <div className='control__text'>
              <span className='control__text--1 control__text--display'>Your Cart:</span>
              <span className='control-text--2'>${calculateTotalPriceOfCart()}</span>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
}

export default React.memo(Control);
