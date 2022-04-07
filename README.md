# React Table Component 

This is a basic Table component implementation using pure React, written in TypeScript.

## Details

The React Table component doesn't depend on any external libraries, only React and TypeScript. It's built from scratch using various React Hooks.

While the efficiency of this approach compared to utilizing one of the existing libraries is questionable (e.g. react-table), I thought of this as a curious challenge for myself, and I'm more-or-less satisfied with the result. Continue reading for API and an example. 

## Buttons

Four buttons are included with the table itself in the component -- for removing selected items, scrolling to first/last row, and adding new items manually, not via the infinite scrolling, which is also turned on by default. 

## Columns 

Each column, not discarded by the `sorter` property, can be used as a criterion to sort the data in 'asc'/'desc' order. One of these indicatos ⬆️/⬇️ shows up in the active column showing the current order too. Continue reading for the API and an example.

## API 

```javascript
  <CustomTable
    headers: Array<{
                    dataIndex: string,
                    title: string,
                    width: number,
                    sorter: boolean
             }>
    data: Array<{}>
    onScroll: Function
    onItemClick: (item: Object) => any
    onFilter: (mode: 'asc' | 'desc', field: string) => any
    onRemoveItems: (items: Array<Object>) => any
  />
```

- `data` - the provided data (array of objects). Each key in object should be in the `dataIndex` field in the `headers`
- `headers` - the list of table columns (array of objects). Each of them should be an object with following fields
  - `dataIndex` - the way to find an item from `data`
  - `sorter` - depends on value the column should be able to be sorted in 'asc' | 'desc' mode
- `onScroll` - should add new items if not provided, otherwise should call provided function
- `onItemClick` - should call a function with info about selected item
- `onRemoveItems` - removes delected raws, calls a function with removed items, if provided
- `onFilter` - should sort items in 'asc' | 'desc' mode, if not provided, otherwise should call provided function. Also, it should say which column has been sorted.

## Usage

The table called with following props: 

```javascript
  const headers: Header[] = [
      { dataIndex: 'id', title: 'ID', width: 70, sorter: false },
      { dataIndex: 'firstName', title: 'First name', width: 160, sorter: true },
      { dataIndex: 'lastName', title: 'Last name', width: 160, sorter: false },
      { dataIndex: 'age', title: 'Age', width: 120, sorter: true },
  ];
  
  const data = [
      { "id": 1, "lastName": "Snow", "firstName": "Jon", "age": 35 },
      { "id": 2, "lastName": "Lannister", "firstName": "Cersei", "age": 42 },
      { "id": 3, "lastName": "Stark", "firstName": "Arya", "age": 16 },
      { "id": 4, "lastName": "Targaryen", "firstName": "Daenerys", "age": 25 },
      { "id": 5, "lastName": "Melisandre", "firstName": "", "age": 150 },
  ]
  
  <CustomTable
    headers={headers}
    data={data}
    onItemClick={(item) => console.log(item)}
    onRemoveItems={(items) => console.log(items)}
  />
```
should render the table below:

| ID  | Last Name  | First Name | Age |
| --- | ---------- | ---------- | --- |
| 1   | Snow       | Jon        | 35  |
| 2   | Lannister  | Cersei     | 42  |
| 3   | Stark      | Arya       | 16  |
| 4   | Targaryen  | Daenerys   | 25  |
| 5   | Melisandre |            | 150 |

