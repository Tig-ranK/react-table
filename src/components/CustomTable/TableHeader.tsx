import { FC } from 'react';
import { IHeader } from '../../App';

interface Props {
  header: IHeader;
  order: 'asc' | 'desc';
  activeColumn: string;
  onFilter?: (mode: 'asc' | 'desc', field: string) => any;
  handleSort: (order: 'asc' | 'desc', field: string, sorter: boolean) => void;
}

export const TableHeader: FC<Props> = ({
  header,
  onFilter,
  order,
  activeColumn,
  handleSort,
}) => {
  return (
    <th
      style={{ width: header.width }}
      onClick={
        () =>
          onFilter
            ? onFilter(order, header.dataIndex)
            : handleSort(order, header.dataIndex, header.sorter)
      }
    >
      {header.title}{' '}
      {header.dataIndex === activeColumn
        ? order === 'desc'
          ? '⬇️'
          : '⬆️'
        : ''}
    </th>
  );
};
