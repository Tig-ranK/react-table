import { FC } from 'react';
import style from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export const Button: FC<Props> = ({children, ...props}) => {
  return (
    <button className={style.button} {...props}>
      {children}
    </button>
  );
};
