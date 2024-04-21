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
      {headers?.map((header) => (
        <th
          key={header}
          className="px-4 py-2 bg-primary text-white border border-gray-300 capitalize cursor-pointer"
          onClick={() => onSort(header)}
        >
          <div className="flex">
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
