import { Button, Form, Space } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponents/TableComponents'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/userService'
import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'

const AdminUser = () => {
  const user = useSelector((state)=>state?.user)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [avatar, setAvatar] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const searchInput = useRef(null);
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    address:'',
  })


  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    address:''
  })

  const [form] = Form.useForm();

  const getAllUsers = async () => {
    const res = UserService.getAllUser()
    return res
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
      })
      form.setFieldsValue(res.data);
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected])

  const handleDetailsUser = () => {
    setIsOpenDrawer(true)
  }
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }} onClick={handleDetailsUser} />
      </div>
    )
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
  };


  const mutationUpdate = useMutationHooks(
    (data) => { 
      const {id,token,...rests} = data
      const res = UserService.updateUser(id,{...rests},token)
      return res
    },
   
  );
  
  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = UserService.deleteUser(
        id,
        token)
      return res
    },
  )


  const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const { isPending: isLoadingUsers, data: users } = queryUser

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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id,isAdmin: user.isAdmin ? 'TRUE':'FALSE' }
  })

  
  const { data:dataUpdated,isPending: isLoadingUpdated, isSuccess:isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted


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


  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateUser({
      ...stateUser,
      image: file.preview
    })
    setAvatar(file.preview)
  }

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateUserDetails({
      ...stateUserDetails,
      image: file.preview
    })
    setAvatar(file.preview)
  }


  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () => {
        queryUser.refetch()  
      }
    })
  }

  return (
    <div>
        <WrapperHeader>Quản lí người dùng</WrapperHeader>
        {/* <div style={{ marginTop: '10px'}}>
            <Button style={{height:'150px', width:'150px', borderRadius: '6px', borderStyle:'dashed'}}>
                <PlusOutlined style={{ fontSize:'60px'}} />
            </Button>
        </div> */}
        <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} isPending={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
      {/* <ModalComponent title="Tạo người dùng" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
            <InputComponent value={stateUser.name} onChange={handleOnChange} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputComponent value={stateUser.email} onChange={handleOnChange} name="email" />
          </Form.Item>

          <Form.Item
             label="Phone"
             name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUser.phone} onChange={handleOnChange} name="phone" />
          </Form.Item>

          <Form.Item
             label="Adress"
             name="address"
            rules={[{ required: true, message: 'Please input your address' }]}
          >
            <InputComponent value={stateUser.address} onChange={handleOnChange} name="address" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your count image' }]}
          >
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateUser?.image && (
                <img src={stateUser?.image} style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt="image" />
              )}
            </WrapperUploadFile>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent> */}
      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
          </Form.Item>

          <Form.Item
             label="Phone"
             name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
          </Form.Item>
          <Form.Item
              label="Adress"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
            </Form.Item>

          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
      <div>Bạn có chắc xóa tài khoản này không?</div>
      </ModalComponent>
    </div>
  )
}

export default AdminUser