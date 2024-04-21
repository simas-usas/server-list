import { twMerge } from 'tailwind-merge';
import { ArrowLeft, ArrowRight } from '../../assets';

interface Props {
  pagination: {
    page: number;
    count: number;
  };
  rowsLength: number;
  onPageChange: (item: number) => void;
}

const TablePagination = ({ pagination: { count, page }, rowsLength, onPageChange }: Props) => {
  const isFirstPage = page === 0;
  const isLastPage = page + 1 * count >= rowsLength;
  return (
    <div className="flex w-full justify-center gap-4">
      <button
        onClick={() => onPageChange(-count)}
        disabled={isFirstPage}
        className={twMerge('bg-secondary rounded-full p-1', isFirstPage && 'opacity-50')}
      >
        <ArrowLeft />
      </button>
      <button
        onClick={() => onPageChange(count)}
        disabled={isLastPage}
        className={twMerge('bg-secondary rounded-full p-1', isLastPage && 'opacity-50')}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default TablePagination;
