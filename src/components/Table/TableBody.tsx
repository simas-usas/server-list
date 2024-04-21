import { twMerge } from 'tailwind-merge';

interface Props {
  rows: (string | number)[][];
  pagination: {
    page: number;
    count: number;
  };
  headers: string[];
}

const TableBody = ({ rows, pagination: { page, count }, headers }: Props) => (
  <tbody>
    {rows.slice(page, page + count).map((row, index) => (
      <tr key={index}>
        {row.map((cell, index) => (
          <td
            key={index}
            className={twMerge(
              'px-2 lg:px-4 py-2 min-w-44 lg:min-w-56 border border-gray-300',
              index === headers.length - 1 && 'text-right',
            )}
          >
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
