import { FC } from 'react';
import { CustomTable } from './components/CustomTable';
import './globalStyles.css';
import data from './data.json';
export interface Header {
  dataIndex: string;
  title: string;
  width: number;
  sorter: boolean;
}

const headers: Header[] = [
  { dataIndex: 'id', title: 'ID', width: 70, sorter: false },
  { dataIndex: 'firstName', title: 'First name', width: 160, sorter: true },
  { dataIndex: 'lastName', title: 'Last name', width: 160, sorter: false },
  {
    dataIndex: 'age',
    title: 'Age',
    width: 120,
    sorter: true,
  },
];

export type Data = typeof data[0];

export const App: FC = () => {
  return (
    <div className='container'>
      <CustomTable
        headers={headers}
        data={data}
        onItemClick={(item) => console.log(item)}
        onRemoveItems={(items) => console.log(items)}
      />
    </div>
  );
};
