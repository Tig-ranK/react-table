import { FC } from 'react';
import { ArrowDown } from '../Button/ArrowDown';
import { ArrowUp } from '../Button/ArrowUp';
import { Button } from '../Button/Button';
import style from './Buttons.module.css';

interface IProps {
  handleRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  scrollUpRef: React.MutableRefObject<HTMLTableRowElement>;
  scrollDownRef: React.MutableRefObject<HTMLHRElement>;
  addNewRows: () => void;
}
export const Buttons: FC<IProps> = ({
  handleRemove,
  scrollUpRef,
  scrollDownRef,
  addNewRows,
}) => {
  return (
    <div className={style.buttonContainer}>
      <Button onClick={handleRemove}>Remove Selected</Button>
      <Button
        onClick={() => {
          scrollUpRef.current.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ArrowUp />
      </Button>
      <Button
        onClick={() => {
          scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ArrowDown />
      </Button>

      <Button onClick={addNewRows}>Add More</Button>
    </div>
  );
};
