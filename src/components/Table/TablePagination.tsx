import { twMerge } from 'tailwind-merge';
import { ArrowLeft, ArrowRight } from '#assets';

interface Props {
  pagination: {
    page: number;
    count: number;
  };
  rowsLength: number;
  onPageClick: (item: number) => void;
  onPageArrowClick: (item: number) => void;
}

const TablePagination = ({ pagination: { count, page }, rowsLength, onPageClick, onPageArrowClick }: Props) => {
  const isFirstPage = page === 0;
  const isLastPage = page + 1 * count >= rowsLength;
  return (
    <div className="flex w-full justify-center gap-4">
      <button
        onClick={() => onPageArrowClick(-count)}
        disabled={isFirstPage}
        className={twMerge(' p-1 bg-secondary rounded-full', isFirstPage && 'opacity-50')}
      >
        <ArrowLeft />
      </button>
      {Array.from(Array(rowsLength / count).keys()).map((item) => (
        <button key={item} onClick={() => onPageClick(item)} className="p-1 bg-secondary rounded-full">
          <div className="w-6 h-6 font-bold">{item + 1}</div>
        </button>
      ))}
      <button
        onClick={() => onPageArrowClick(count)}
        disabled={isLastPage}
        className={twMerge('p-1 bg-secondary rounded-full', isLastPage && 'opacity-50')}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default TablePagination;
