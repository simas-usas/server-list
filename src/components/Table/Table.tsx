import { useCallback, useEffect, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TablePagination from './TablePagination';

type TableData = { [key: string]: number | string }[];

interface Props {
  data?: TableData;
}

const Table = ({ data }: Props) => {
  const [tableData, setTableData] = useState<TableData>([]);

  const headers = tableData[0] && Object.keys(tableData[0]);
  const rows = tableData.map((item) => Object.values(item));
  const [pagination, setPagination] = useState<{ page: number; count: number }>({ page: 0, count: 15 });
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
      setPagination((prev) => ({ ...prev, page: 0 }));
    },
    [tableData, sort],
  );

  const onPageClick = (page: number) => {
    setPagination((prev) => ({ ...prev, page: page * prev.count }));
  };

  const onPageArrowClick = (increment: number) => {
    setPagination((prev) => ({ ...prev, page: prev.page + increment }));
  };

  return (
    tableData && (
      <div>
        <table className="bg-secondary mb-2">
          <TableHead headers={headers} sort={sort} onSort={onSort} />
          <TableBody rows={rows} pagination={pagination} headers={headers} />
        </table>
        <TablePagination
          pagination={pagination}
          rowsLength={rows.length}
          onPageClick={onPageClick}
          onPageArrowClick={onPageArrowClick}
        />
      </div>
    )
  );
};

export default Table;
