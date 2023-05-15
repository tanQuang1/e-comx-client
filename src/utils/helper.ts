import { CartItemType } from './../store/app/app.type';
import { APP_ICONS } from './app-config';
const ListMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const amountOfStars = 5;
const formatDate = (DateComment: string) => {
  const date = new Date(DateComment);
  const month = ListMonths[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const newdate = month + ' ' + day + ',' + year;
  return newdate;
};
const getCorrectAvgStarIcon = (avg_review: number | undefined) => {
  const stars = [...Array(amountOfStars).fill(APP_ICONS.star)];
  if (avg_review) {
    const remainder = Math.round(avg_review) - avg_review;
    const quotient = avg_review - remainder;
    for (let i = 0; i < stars.length; i++) {
      if (quotient >= i + 1) {
        stars[i] = APP_ICONS.starFull;
      } else if (quotient < i + 1 && remainder === 0) {
        stars[i] = APP_ICONS.star;
      } else stars[i] = APP_ICONS.halfStar;
    }
  }
  return stars;
};

const getScoreStarIcon = (scoreStar: number) => {
  const stars = [...Array(amountOfStars).fill(APP_ICONS.star)];
  if (scoreStar) {
    for (let i = 0; i < scoreStar; i++) {
      stars[i] = APP_ICONS.starFull;
    }
  }
  return stars;
};
export { formatDate, getCorrectAvgStarIcon, getScoreStarIcon };

export const saveCartOnLocalStorage = (cart: CartItemType[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const formatNumber = (number: number) => {
  if (number) {
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return 0;
};

export const getCorrectStarIcon = (avg_review: number) => {
  const stars = [...Array(amountOfStars).fill(APP_ICONS.star)];

  if (avg_review) {
    const remainder = Math.round(avg_review) - avg_review;
    const quotient = avg_review - remainder;
    for (let i = 0; i < stars.length; i++) {
      if (quotient >= i + 1) {
        stars[i] = APP_ICONS.starFull;
      } else if (quotient < i + 1 && remainder === 0) {
        stars[i] = APP_ICONS.star;
      } else stars[i] = APP_ICONS.halfStar;
    }
  }
  return stars;
};
