interface Props {
  rows: (string | number)[][];
  pagination: {
    page: number;
    count: number;
  };
}

const TableBody = ({ rows, pagination: { page, count } }: Props) => (
  <tbody>
    {rows.slice(page, page + count).map((row, index) => (
      <tr key={index}>
        {row.map((cell, index) => (
          <td key={index} className="px-4 py-2 lg:min-w-56 border border-gray-300">
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
