import { ImageType } from '@/types/product.type';
import Image from 'next/image';
import React, { memo, useState } from 'react';

interface propsListImageType {
  listImage: ImageType[];
}

function DetailsImage(props: propsListImageType) {
  // animation
  const animation = `@keyframes animationOpacity${Date.now()}{
      from {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
    }`;
  const { listImage = [] } = props;
  const [activeIndexImage, setActiveIndexImage] = useState<number>(0);
  //render slick dots
  const renderSlickDots = () => {
    return listImage?.map((_: ImageType, index: number) => {
      return (
        <li
          key={index}
          className={`${index === activeIndexImage ? 'slick click-active' : 'slick'}`}
          onClick={() => {
            setActiveIndexImage(index);
          }}
        ></li>
      );
    });
  };

  //render list image
  const renderListImage = () => {
    return listImage?.map((image: ImageType, index: number) => {
      return (
        <div
          key={index}
          className={` selection__item ${
            index === activeIndexImage ? 'selection__item-active' : ''
          }`}
          onClick={() => {
            setActiveIndexImage(index);
          }}
        >
          <Image width={70} height={70} src={`${image?.url}`} alt={`${image?.public_id}`} />
        </div>
      );
    });
  };

  return (
    <div className='details__img'>
      <style>{animation}</style>
      <div className='img__display'>
        <div className='display__selection'>{renderListImage()}</div>
        <div
          className='display__active'
          style={{
            animation: `animationOpacity${Date.now()} 0.8s ease-in-out`,
          }}
        >
          <Image
            src={`${listImage[activeIndexImage]?.url}`}
            alt={`${listImage[activeIndexImage]?.public_id}`}
            fill={true}
          />
        </div>
      </div>
      <div className='img__slick-dots'>
        <ul className='slick-dots'>{renderSlickDots()}</ul>
      </div>
    </div>
  );
}

export default memo(DetailsImage);
