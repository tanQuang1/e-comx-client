interface FilterBoxPropsType {
  title: string;
  children?: React.ReactNode;
}
export default function FilterBox(props: FilterBoxPropsType) {
  const { title, children } = props;
  return (
    <div className='filter__box'>
      <h5 className='filter--heading'>{title}</h5>
      {children}
    </div>
  );
}
