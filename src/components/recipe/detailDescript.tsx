import React from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface DataType {
  key: string;
  name: string;
  borrow: number;
  repayment: number;
}

interface FixedDataType {
  key: React.Key;
  name: string;
  description: string;
}

  const detailDescript = (props = {
    recipedescription : [],
  })=>{

  let keyMap = [];
  props.recipedescription.map((it)=>{
    keyMap.push(it.key);
  })
  let valueMap = [];
  props.recipedescription.map((it)=>{
    valueMap.push(it.value);
  })

  const fixedColumns: ColumnsType<FixedDataType> = [
    {
      title: '순서',
      dataIndex: 'name',
      fixed: true,
      width: 80,
    },
    {
      title: '설명',
      dataIndex: 'description',
    },
  ];

  const fixedData: FixedDataType[] = [];
  for (let i = 0; i < keyMap.length; i += 1) {
    fixedData.push({
      key: i,
      name: keyMap[i%keyMap.length],
      description: valueMap[i%keyMap.length],
    });
  }


    return(
      <>
    <br />
    <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{ x: 2000, y: 500 }}
      bordered
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            {/* <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell> */}
          </Table.Summary.Row>
        </Table.Summary>
        
      )}
    />
  </>
    );
}

export default detailDescript;