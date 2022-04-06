import { FC } from 'react';

interface Props {
  checked: boolean;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectAll: FC<Props> = ({handleSelectAll, checked }) => (
  <th>
    <input type='checkbox' checked={checked} onChange={handleSelectAll} />
  </th>
);
