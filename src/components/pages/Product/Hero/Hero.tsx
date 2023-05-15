type HeroPropsType = {
  pageName: string | string[];
};
export function Hero(props: HeroPropsType) {
  return (
    <div className='hero--box'>
      {/* Banner go here */}
      <h1 className='hero--heading'>
        {props.pageName ? 'All Products of ' + props.pageName : 'All Products'}
      </h1>
    </div>
  );
}
