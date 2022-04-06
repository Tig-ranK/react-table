import React, { FC, MutableRefObject, useRef, useState } from 'react';
import { Data, Header } from '../../App';
// components
import { Checkbox } from '../Checkbox';
import { SelectAll } from '../SelectAll';
import { Button } from '../Button/Button';
// hooks
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
// styles
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
  const headers = props.headers;
  // data
  const [limit, setLimit] = useState(30);
  const [data, setData] = useState<Data[]>(props.data);
  // sorting
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [activeColumn, setActiveColumn] = useState('');
  // select
  const [checked, setChecked] = useState(
    data.map((item) => ({ id: item.id, check: false }))
  );
  const [selectAll, setSelectAll] = useState(false);
  //  scroll
  const scrollRef = useRef() as MutableRefObject<HTMLHRElement>;
  // continous loading
  const hasMore: boolean = data.length - limit >= 10;
  const addNewRows = () => {
    setLimit((prev) => prev + 10);
  };
  const { lastElementRef } = useInfiniteScroll(addNewRows, hasMore);

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

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) =>
      prev.map((elem) => ({ ...elem, check: e.target.checked }))
    );
    setSelectAll((prev) => !prev);
  };

  const mappedHeaders = (
    <tr key={0}>
      <SelectAll checked={selectAll} handleSelectAll={handleSelectAll} />
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
    setChecked((prev) =>
      prev.map((elem) =>
        elem.id === id ? { ...elem, check: !elem.check } : elem
      )
    );
  };

  const mappedData = data.slice(0, limit).map((item, key) => {
    const children = (
      <>
        <Checkbox
          id={item.id}
          handleCheck={handleCheck}
          checked={checked.find((i) => i.id === item.id)?.check!}
        />
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
      </>
    );
    if (limit === key + 1) {
      return (
        <tr className={style.row} ref={lastElementRef} key={key + 1}>
          {children}
        </tr>
      );
    }
    return (
      <tr className={style.row} key={key + 1}>
        {children}
      </tr>
    );
  });

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setData((prevData) => {
      const selectedRows = prevData.filter(
        (item) => checked[item.id - 1].check
      );
      if (selectedRows.length) {
        props.onRemoveItems?.(selectedRows);
      }
      return prevData.filter((item) => !checked[item.id - 1].check);
    });
  };

  return (
    <div
      className={style.container}
      onScroll={() => {
        props.onScroll?.();
      }}
    >
      <table className={style.table}>
        <thead>{mappedHeaders}</thead>
        <tbody>{mappedData}</tbody>
      </table>
      <div className={style.buttonContainer}>
        <Button onClick={handleRemove}>Remove Selected</Button>
        <Button
          onClick={() => {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Scroll To End
        </Button>
        <Button style={{ top: '5em' }} onClick={addNewRows}>
          Add More
        </Button>
      </div>
      <hr ref={scrollRef} />
    </div>
  );
};
