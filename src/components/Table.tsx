import { useCallback, useEffect, useState } from 'react';

type TableData = { [key: string]: number | string }[];

interface Props {
  data?: TableData;
}

const Table = ({ data }: Props) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(15);
  const [tableData, setTableData] = useState<TableData>([]);

  const headers = tableData[0] && Object.keys(tableData[0]);
  const rows = tableData.map((item) => Object.values(item));
  const [sort, setSort] = useState<{ sortBy: string | null; order: string | null }>({ sortBy: null, order: null });

  useEffect(() => {
    if (data && !tableData.length) {
      setTableData(data);
    }
  }, [data]);

  const onSort = useCallback(
    (header: string) => {
      const sortOrder = !sort.order || sort.order === 'desc' ? 'asc' : 'desc';
      const sortedArray = tableData.sort((a, b) => {
        let result;
        if (typeof a[header] === 'string' && typeof b[header] === 'string') {
          result = (a[header] as string).localeCompare(b[header] as string);
        } else {
          result = (a[header] as number) - (b[header] as number);
        }
        return sortOrder === 'asc' ? result : -result;
      });
      setSort({ sortBy: header, order: sortOrder });
      setTableData(sortedArray);
    },
    [tableData, sort],
  );

  const onPageChange = (increment: number) => {
    setPage((prevPage) => prevPage + increment);
  };

  return (
    <div className="bg-slate-50">
      <table>
        <thead>
          <tr className="text-left">
            {headers?.map((header) => (
              <th
                key={header}
                className="px-4 py-2 bg-primary text-white border border-gray-300 capitalize cursor-pointer"
                onClick={() => onSort(header)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(page, page + count).map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index} className="px-4 py-2 min-w-56 border border-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full justify-center">
        <button onClick={() => onPageChange(-count)} disabled={page === 0}>
          Prev
        </button>
        <button onClick={() => onPageChange(count)} disabled={page + 1 * count >= rows.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
