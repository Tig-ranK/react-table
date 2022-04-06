import { FC } from 'react';

interface CheckBoxProps {
  id: number;
  checked: boolean;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Checkbox: FC<CheckBoxProps> = ({ id, handleCheck, checked }) => (
  <td>
    <input
      type='checkbox'
      checked={checked}
      id={String(id)}
      onChange={handleCheck}
    />
  </td>
);
