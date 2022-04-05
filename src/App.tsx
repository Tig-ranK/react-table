import { FC } from 'react';
import { CustomTable } from './components/CustomTable';

export interface Header {
  dataIndex: string;
  title: string;
  width: number;
  sorter: boolean;
}

const headers: Header[] = [
  {
    dataIndex: 'name',
    title: 'Name',
    width: 120,
    sorter: false,
  },
  {
    dataIndex: 'rate',
    title: 'Rating',
    width: 120,
    sorter: true,
  },
];

const data = [
  {
    name: 'React',
    rate: 120,
  },
  {
    name: 'Vue',
    rate: 130,
  },
];

export type Data = typeof data[0];

export const App: FC = () => {
  
  

  return (
    <div className='App'>
      <CustomTable
        headers={headers}
        data={data}
        onItemClick={(item) => console.log(item)}
        onRemoveItems={(items) => console.log(items)}
      />
    </div>
  );
};
