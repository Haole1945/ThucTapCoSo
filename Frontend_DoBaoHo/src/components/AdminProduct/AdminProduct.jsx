import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal, Space, Upload, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponents from '../TableComponents/TableComponents'
import InputComponent from './../InputComponent/InputComponent';
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
  
const AdminProduct = () => {
  const user = useSelector((state)=>state?.user)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [avatar, setAvatar] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const [form] = Form.useForm();

  const getAllProducts = async () => {
    const res = ProductService.getAllProduct()
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount
      })
      form.setFieldsValue(res.data);
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: ''
    })
    form.resetFields()
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: ''
    })
    form.resetFields()
  };

  const mutation = useMutationHooks(
    (data) => { const res = ProductService.createProduct(data)
      return res
    }
  );

  const mutationUpdate = useMutationHooks(
    (data) => { 
      const {id,token,...rests} = data
      const res = ProductService.updateProduct(id,token,{...rests})
      return res
    },
   
  );
  
  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = ProductService.deleteProduct(
        id,
        token)
      return res
    },
  )

  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
  const { isPending: isLoadingProducts, data: products } = queryProduct

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 50',
          value: '>=',
        },
        {
          text: '<= 50',
          value: '<=',
        }
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 50
        }
        return record.price <= 50
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })

  

  const { data, isPending, isSuccess, isError } = mutation
  const { data:dataUpdated,isPending: isLoadingUpdated, isSuccess:isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated]);


  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      image: stateProduct.image,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
    setAvatar(file.preview)
  }

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
    setAvatar(file.preview)
  }


  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
      onSettled: () => {
        queryProduct.refetch()  
      }
    })
  }

  return (
    <div>
      <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponents columns={columns} isPending={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
      <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
          </Form.Item>

          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your count inStock!' }]}
          >
            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your count price' }]}
          >
            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your count description' }]}
          >
            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your count image' }]}
          >
            <Upload onChange={handleOnChangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img src={stateProduct?.image} style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt="image" />
              )}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onUpdateProduct}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
          </Form.Item>

          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your count inStock!' }]}
          >
            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your count price' }]}
          >
            <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your count description' }]}
          >
            <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your count image' }]}
          >
            <Upload onChange={handleOnChangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
              {stateProductDetails?.image && (
                <img src={stateProductDetails?.image} style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt="image" />
              )}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
      <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct
