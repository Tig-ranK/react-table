import React, { FC, MutableRefObject, useRef, useState } from 'react';
import { IData, IHeader } from '../../App';
// components
import { SelectAll } from '../SelectAll';
import { SelectRow } from '../SelectRow';
import { TableHeader } from './TableHeader';
import { TableData } from './TableData';
// hooks
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
// styles
import style from './CustomTable.module.css';
import { Buttons } from './Buttons';

export interface TableProps {
  headers: Array<IHeader>;
  data: Array<IData>;
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
  const [data, setData] = useState<IData[]>(props.data);
  // sorting
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [activeColumn, setActiveColumn] = useState('');
  // select
  const [checked, setChecked] = useState(
    data.map((item) => ({ id: item.id, check: false }))
  );
  const [selectAll, setSelectAll] = useState(false);
  //  scroll
  const scrollUpRef = useRef() as MutableRefObject<HTMLTableRowElement>;
  const scrollDownRef = useRef() as MutableRefObject<HTMLHRElement>;
  // continous loading
  const hasMore: boolean = data.length - limit >= 10;
  const addNewRows = () => {
    setLimit((prev) => prev + 10);
  };
  const { lastElementRef } = useInfiniteScroll(addNewRows, hasMore);

  // handlers
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

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.id);
    setChecked((prev) =>
      prev.map((elem) =>
        elem.id === id ? { ...elem, check: !elem.check } : elem
      )
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) =>
      prev.map((elem) => ({ ...elem, check: e.target.checked }))
    );
    setSelectAll((prev) => !prev);
  };

  // rendered UI
  const mappedHeaders = (
    <tr ref={scrollUpRef} key={0}>
      <SelectAll checked={selectAll} handleSelectAll={handleSelectAll} />
      {headers.map((header) => (
        <TableHeader
          key={header.dataIndex}
          header={header}
          activeColumn={activeColumn}
          order={order}
          handleSort={handleSort}
          onFilter={props.onFilter}
        />
      ))}
    </tr>
  );

  const mappedData = data.slice(0, limit).map((item, key) => {
    const children = (
      <>
        <SelectRow
          id={item.id}
          handleCheck={handleCheck}
          checked={checked.find((i) => i.id === item.id)?.check!}
        />
        {headers.map((header) => {
          const data = (item as Item)[header.dataIndex];
          return (
            <TableData
              data={data}
              item={item}
              width={header.width}
              key={header.dataIndex}
              onItemClick={props.onItemClick}
            />
          );
        })}
      </>
    );
    // attaching the ref for infinite scroll
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
      <Buttons
        scrollUpRef={scrollUpRef}
        scrollDownRef={scrollDownRef}
        addNewRows={addNewRows}
        handleRemove={handleRemove}
      />
      <hr ref={scrollDownRef} />
    </div>
  );
};
