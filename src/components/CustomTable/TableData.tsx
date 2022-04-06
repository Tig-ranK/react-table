import { FC } from 'react';
import { IData } from '../../App';

interface Props {
  width: number;
  onItemClick?: (item: Object) => any;
  data: string | number;
  item: IData;
}

export const TableData: FC<Props> = ({ width, data, onItemClick, item }) => {
  return (
    <td style={{ width }} onClick={() => onItemClick?.(item)}>
      {data}
    </td>
  );
};
