import React from 'react';

type InfinitySlideProps = {
  children: React.ReactNode;
  headingLeft: string;
  headingRight?: React.ReactNode | string;
};

export default function InfinitySlide(props: InfinitySlideProps) {
  return (
    <section className='infinity-slide'>
      <div className='infinity-slide__heading'>
        <p className='infinity-slide__heading--left'>{props.headingLeft}</p>
        <p className='infinity-slide__heading--right'>{props.headingRight}</p>
      </div>
      <div className='infinity-slide__content'>{props.children}</div>
    </section>
  );
}
