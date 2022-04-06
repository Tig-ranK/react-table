import { FC } from 'react';
import { CustomTable } from './components/CustomTable/CustomTable';
import data from './data.json';
import './globalStyles.css';
export interface IHeader {
  dataIndex: string;
  title: string;
  width: number;
  sorter: boolean;
}

const headers: IHeader[] = [
  { dataIndex: 'id', title: 'ID', width: 80, sorter: true },
  { dataIndex: 'firstName', title: 'First name', width: 160, sorter: true },
  { dataIndex: 'lastName', title: 'Last name', width: 160, sorter: false },
  {
    dataIndex: 'age',
    title: 'Age',
    width: 120,
    sorter: true,
  },
];

export type IData = typeof data[0];

export const App: FC = () => {
  return (
    <div className='app'>
      <CustomTable
        headers={headers}
        data={data}
        onItemClick={(item) => console.log(item)}
        onRemoveItems={(items) => console.log(items)}
        onScroll={() => console.log('Scrolling...')}
      />
    </div>
  );
};
