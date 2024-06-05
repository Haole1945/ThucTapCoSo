import { Table } from 'antd';
import React, { useState } from 'react'

const TableComponents = (props) => {
    const { selectionType = 'checkbox', data = [], isPending = false, columns = []} = props

    const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  return (   
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    
  )
}

export default TableComponents

