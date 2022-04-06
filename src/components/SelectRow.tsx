import { FC } from 'react';

interface Props {
  id: number;
  checked: boolean;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SelectRow: FC<Props> = ({ id, handleCheck, checked }) => (
  <td>
    <input
      type='checkbox'
      checked={checked}
      id={String(id)}
      onChange={handleCheck}
    />
  </td>
);
