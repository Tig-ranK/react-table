import React, { FC, useMemo, useState } from 'react';
import { Data, Header } from '../App';
import { Checkbox } from './Checkbox';
import style from './CustomTable.module.css';

export interface TableProps {
  headers: Array<Header>;
  data: Array<Data>;
  onItemClick?: (item: Object) => any;
  onRemoveItems?: (items: Array<Object>) => any;
  onScroll?: Function;
  onFilter?: (mode: 'asc' | 'desc', field: string) => any;
}

export type Item = { [key: string]: string | number };

export const CustomTable: FC<TableProps> = (props) => {
  const [headers, setHeaders] = useState(props.headers);
  // const headers = useMemo(() => props.headers, [props.headers]);
  const [data, setData] = useState(props.data);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [activeColumn, setActiveColumn] = useState('');
  const [checked, setChecked] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const handleSort = (
    order: 'asc' | 'desc',
    field: string,
    sorter: boolean
  ): void => {
    if (!sorter) return;

    if (order === 'desc') {
      const sorted = [...data].sort((a, b) =>
        (a as Item)[field] < (b as Item)[field] ? 1 : -1
      );
      setData(sorted);
      setActiveColumn(field);
      setOrder('asc');
    }
    if (order === 'asc') {
      const sorted = [...data].sort((a, b) =>
        (a as Item)[field] > (b as Item)[field] ? 1 : -1
      );
      setData(sorted);
      setActiveColumn(field);
      setOrder('desc');
    }
  };

  const mappedHeaders = (
    <tr key={0}>
      {headers.map((header) => (
        <th
          className={style.header}
          key={header.dataIndex}
          style={{ width: header.width }}
          onClick={
            () =>
              props.onFilter
                ? props.onFilter(order, header.dataIndex)
                : handleSort(order, header.dataIndex, header.sorter)
            // TODO check if the ternary hear causes issues
          }
        >
          {header.title}{' '}
          {header.dataIndex === activeColumn
            ? order === 'desc'
              ? '⬇️'
              : '⬆️'
            : ''}
        </th>
      ))}
    </tr>
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.id);
    setChecked((prev) => prev.map((elem, i) => (i === id ? !elem : elem)));
  };

  const mappedData = data.map((item, key) => {
    return (
      <tr className={style.row} key={key + 1}>
        <Checkbox id={key} handleCheck={handleCheck} checked={checked[key]} />
        {headers.map((header) => {
          const data = (item as Item)[header.dataIndex];
          return (
            <td
              style={{ width: header.width }}
              onClick={() => props.onItemClick?.(item)}
              key={header.dataIndex}
              className={style.data}
            >
              {data}
            </td>
          );
        })}
      </tr>
    );
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setData((prevData) => prevData.filter((item) => checked[item.id - 1]));
  };

  return (
    <div className={style.container}>
      <table className={style.table}>
        <thead>{mappedHeaders}</thead>
        <tbody>{mappedData}</tbody>
      </table>
      <button style={{ height: '60px' }} onClick={handleRemove}>
        Remove Selected
      </button>
    </div>
  );
};
