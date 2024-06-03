import { useCallback, useEffect, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import { isNumber, isString } from '#lib/utls';

type TableData = { [key: string]: number | string }[];

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

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
      if (data.length < pagination.count) {
        setPagination((prev) => ({ ...prev, count: data.length }));
      }
      setTableData(data);
    }
  }, [data]);

  const compareValues = <T extends string | number>(a: T, b: T): number => {
    if (isString(a) && isString(b)) {
      return a.localeCompare(b);
    }
    if (isNumber(a) && isNumber(b)) {
      return a - b;
    }
    return 0;
  };

  const onSort = useCallback(
    (header: string) => {
      const sortOrder: SortOrder = !sort.order || sort.order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;

      const sortedArray = [...tableData].sort((a, b) => {
        const aValue = a[header];
        const bValue = b[header];
        return sortOrder === SortOrder.ASC ? compareValues(aValue, bValue) : compareValues(bValue, aValue);
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
        <table className="bg-secondary mb-4">
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
