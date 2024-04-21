import { twMerge } from 'tailwind-merge';
import { ArrowDown } from '../../assets';

interface Props {
  headers: string[];
  sort: {
    sortBy: string | null;
    order: string | null;
  };
  onSort: (item: string) => void;
}

const TableHead = ({ headers, sort, onSort }: Props) => (
  <thead>
    <tr className="text-left">
      {headers?.map((header, index) => (
        <th
          key={header}
          className="px-2 lg:px-4 py-2 bg-primary text-white border border-gray-300 capitalize cursor-pointer"
          onClick={() => onSort(header)}
        >
          <div className={twMerge('flex', index === headers.length - 1 && 'justify-end')}>
            {header}
            {sort.sortBy === header && (
              <ArrowDown className={twMerge('fill-secondary', sort.order === 'asc' && 'rotate-180')} />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
