import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import api from '@/services';
import { FormReviewsType, ReviewsType } from '@/types/review.type';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { formatDate, getScoreStarIcon } from '@/utils/helper';
import { Icon, IconifyIcon } from '@iconify/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Loading from '@/components/ui/Loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ReviewsPropsType {
  dataReviews: ReviewsType[];
  productId: string | undefined | string[];
  avg_star: IconifyIcon[];
}

interface ReviewFormDataType {
  payload: FormReviewsType;
  isError: boolean;
}
const reviewFormDataInitial: ReviewFormDataType = {
  payload: {
    productId: '',
    content: '',
    score: 0,
  },
  isError: false,
};
export default function Reviews(props: ReviewsPropsType) {
  const router = useRouter();
  const { dataReviews, productId, avg_star } = props;
  const [reviews, setReviews] = useState<ReviewsType[]>(dataReviews);
  const [addReviews, { isLoading }] = api.useAddReviewsMutation();
  const [activeWriteReviews, setActiveWriteReviews] = useState<boolean>(false);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormDataType>(reviewFormDataInitial);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  // console.log(dataReviews);
  const checkValidationWriteReviews = () => {
    if (reviewFormData.payload.score == 0 || reviewFormData.payload.content == '') {
      return false;
    } else {
      return true;
    }
  };
  const handleChangeContentReview = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewFormData({
      ...reviewFormData,
      payload: { ...reviewFormData.payload, content: event.target.value },
    });
  };
  const onSubmitWriteReview = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    const isValid = checkValidationWriteReviews();
    if (!isValid) {
      setReviewFormData({ ...reviewFormData, isError: true });
    } else {
      setReviewFormData({ ...reviewFormData, isError: false });
      const data = { ...reviewFormData.payload, productId: productId };
      addReviews(data).then((res: any) => {
        console.log(res);
        if (res.error.data.success) {
          switch (res.error.data.status) {
            case 400:
              toast('Product not fount', { type: 'error' });
              router.push(APP_ROUTER.PRODUCT_LIST);
              break;
            case 401:
              toast('Please login to write reviews', { type: 'warning' });
              break;

            default:
              toast('Something wrong. Try again later', { type: 'warning' });
              break;
          }
        } else {
          setReviews([
            ...reviews,
            {
              product: '63fe4576c00c0875541e7838',
              user: '63fe48636566647e5729ac6e',
              name: 'admintest',
              content: '1',
              score: 0,
              _id: '642ae889d1b0e64dca171317',
              createdAt: '2023-04-03T14:54:01.223Z',
              updatedAt: '2023-04-03T14:54:01.223Z',
            },
          ]);
          setActiveMessage(true);
          setActiveWriteReviews(false);
          setReviewFormData(reviewFormDataInitial);
        }
      });
    }
  };

  const renderProductStarRating = () => {
    const listStar = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= reviewFormData.payload.score) {
        listStar.push(
          <Icon
            width={25}
            height={25}
            icon={APP_ICONS.star}
            className='star--corse'
            key={i}
            onClick={() => {
              setReviewFormData({
                ...reviewFormData,
                payload: { ...reviewFormData.payload, score: i },
              });
            }}
          ></Icon>,
        );
      } else {
        listStar.push(
          <Icon
            width={25}
            height={25}
            icon={APP_ICONS.star}
            key={i}
            onClick={() => {
              setReviewFormData({
                ...reviewFormData,
                payload: { ...reviewFormData.payload, score: i },
              });
            }}
          ></Icon>,
        );
      }
    }
    return listStar;
  };

  const renderReviews = () => {
    return (
      reviews &&
      reviews?.map((itemReviews: any, index: number) => {
        const stars = getScoreStarIcon(itemReviews.score);
        return (
          <div className='body__content' key={index}>
            <div className='content__feedback'>
              <div className='feedback--rate'>
                {stars.map((star: IconifyIcon | string, index: number) => {
                  return <Icon width={20} height={20} icon={star} key={index}></Icon>;
                })}
              </div>
              <div className='feedback--name'>{itemReviews.name}</div>
              <div className='feedback--date'>
                on <span>{formatDate(itemReviews.updatedAt)}</span>
              </div>
              <div className='feedback--comment'>{itemReviews.content}</div>
            </div>
            <div className='content__report'>
              <a href='#'>Report as Inappropriate</a>
            </div>
          </div>
        );
      })
    );
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className='reviews'>
        <div className='reviews__header'>
          <div className='header--title'>
            <h1>Customer Reviews</h1>
          </div>
          <div className='header--star'>
            {dataReviews?.length === 0 ? (
              <div>No reviews yet</div>
            ) : (
              <span className='star--rating'>
                {avg_star?.map((star: IconifyIcon | string, index: number) => {
                  return <Icon width={20} height={20} icon={star} key={index}></Icon>;
                })}
                <span className='star--caption'>
                  {reviews ? `Based on ${dataReviews?.length} review` : null}
                </span>
              </span>
            )}

            <p
              className='write-review'
              onClick={() => {
                setActiveWriteReviews(!activeWriteReviews);
                setActiveMessage(false);
              }}
            >
              Write a review
            </p>
          </div>
        </div>
        <div className={`${activeWriteReviews ? 'reviews__write active' : 'reviews__write'}`}>
          <h3> Write a review</h3>
          <div className={`${reviewFormData.isError ? 'write__error' : 'write__error hide'}`}>
            Not all the fields have been filled out correctly!
          </div>

          <div className='write__score'>{renderProductStarRating()}</div>
          <form>
            <div className='write__content'>
              <label>Body of Review</label>
              <TextField
                label='Write your components here'
                placeholder='test'
                error
                variant='small'
                labelPosition='inline'
                name='content'
                value={reviewFormData.payload.content}
                onChange={handleChangeContentReview}
              />
            </div>
            <div className='write__submit'>
              <Button size='lg' type='submit' onClick={onSubmitWriteReview}>
                SUBMIT REVIEW
              </Button>
            </div>
          </form>
        </div>
        {activeMessage ? (
          <div className='reviews__message active'>Thank you for submitting a review!</div>
        ) : (
          <div className='reviews__message'>Thank you for submitting a review!</div>
        )}
        {/* <div className='reviews__message'>Thank you for submitting a review!</div> */}
        <div className='reviews__body'>{renderReviews()}</div>
      </div>
    </>
  );
}
