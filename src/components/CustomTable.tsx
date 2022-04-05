import { FC } from 'react';
import { Data } from '../App';
import style from './CustomTable.module.css';

export interface TableProps {
  headers: Array<{
    dataIndex: string;
    title: string;
    width: number;
    sorter: true | false;
  }>;
  data: Array<Data>;
  onItemClick?: (item: Object) => any;
  onRemoveItems?: (items: Array<Object>) => any;
  onScroll?: Function;
  onFilter?: (mode: 'asc' | 'desc', field: string) => any;
}

export const CustomTable: FC<TableProps> = ({
  headers,
  data,
  onItemClick,
  onRemoveItems,
}) => {
  const mappedHeaders = headers.map((header) => (
    <th
      className={style.header}
      key={header.dataIndex}
      style={{ width: header.width }}
    >
      {header.title}
    </th>
  ));

  const mappedData = data.map((item, key) => {
    return (
      <tr key={key + 1}>
        <td className={style.data}>{item.name}</td>
        <td className={style.data}>{item.rate}</td>
      </tr>
    );
  });

  return (
    <table className={style.table}>
      <thead>
        <tr>{mappedHeaders}</tr>
      </thead>
      <tbody>{mappedData}</tbody>
    </table>
  );
};
