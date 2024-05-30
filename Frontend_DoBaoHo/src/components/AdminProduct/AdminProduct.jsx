// import React, { useEffect, useState } from 'react'
// import { WrapperHeader } from './style'
// import { Button, Form, Modal, Upload, message } from 'antd'
// import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
// import TableComponents from '../TableComponents/TableComponents'
// import InputComponent from './../InputComponent/InputComponent';
// import { getBase64 } from '../../utils'
// import { createProduct } from '../../services/ProductService'
// import * as ProductService from '../../services/ProductService'
// import { useMutationHooks } from '../../hooks/useMutationHook'
// import { getAllProduct } from './../../services/ProductService';
// import { useQuery } from '@tanstack/react-query'
// import DrawerComponent from '../DrawerComponent/DrawerComponent'

// const AdminProduct = () => {
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//   const [avatar,setAvatar] = useState(false)
//   const [rowSelected, setRowSelected] = useState('')
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//   const [stateProduct, setStateProduct] = useState({
//     name:'',
//     price:'',
//     description: '',
//     image: '',
//     type: '',
//     countInStock: ''
//   })

//   const [stateProductDetails, setStateProductDetails] = useState({
//     name:'',
//     price:'',
//     description: '',
//     image: '',
//     type: '',
//     countInStock: ''
//   })

//   const getAllProducts = async () => {
//     const res = ProductService.getAllProduct()
//     return res
//   }
  
//   const fetchGetDetailsProduct = async (rowSelected) => {
//     const res = await ProductService.getDetailsProduct(rowSelected)
//     if (res?.data) {
//       setStateProductDetails({
//         name: res?.data?.name,
//         price: res?.data?.price,
//         description: res?.data?.description,
//         rating: res?.data?.rating,
//         image: res?.data?.image,
//         type: res?.data?.type,
//         countInStock: res?.data?.countInStock,
//         discount: res?.data?.discount
//       })
//     }
//     setIsLoadingUpdate(false)
//   }

//   useEffect(() => {
//     form.setStateProductValue(stateProductDetails)
//   }, [form, stateProductDetails])

//   useEffect(() => {
//     if (rowSelected) {
//       fetchGetDetailsProduct(rowSelected)
//     }
//   }, [rowSelected])

//   const handleDetailsProduct = () => {
//     if (rowSelected) {  
//       fetchGetDetailsProduct()
//     }
//     setIsOpenDrawer(true)
//     console.log('rowSelected')
//   }
  
//   const[form] = Form.useForm();
//   const renderAction = () => {
//     return(
//       <div>
//         <DeleteOutlined style={{fontSize: '30px', color: 'green', cursor:'pointer'}}/>
//         <EditOutlined style={{fontSize: '30px', color: 'red', cursor:'pointer'}} onClick={handleDetailsProduct}/>
//       </div>
//     )
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setStateProduct({
//       name:'',
//       price:'',
//       description: '',
//       image: '',
//       type: '',
//       countInStock: ''
//     })
//     form.resetFields()
//   };

//   const mutation = useMutationHooks(
//     (data) => {const res = ProductService.createProduct(data)
//       return res
//     }
//   );

//   const {data, isPending, isSuccess, isError } = mutation

//   const{isPending: isPendingProducts ,data: products} = useQuery({queryKey:['products'], queryFn:getAllProducts})  

//   const columns = [
//     {
//     title: 'Name',
//     dataIndex: 'name',
//     render: (text) => <a>{text}</a>,
//     },
//     {
//     title: 'Price',
//     dataIndex: 'price',
//     },
//     {
//     title: 'Type',
//     dataIndex: 'type',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: renderAction,

//       },
// ];
// const dataTable = products?.data?.length && products?.data?.map((product) => {
//   return {...product, key: product._id}
// })

//   useEffect(() => {
//     if (isSuccess && data?.status === 'OK') {
//       message.success()
//       handleCancel()
//     }else if(isError){
//       message.error()
//     }
//   }, [isSuccess]);

//   const onFinish = () => {
//     mutation.mutate(stateProduct)
//   }

//   const handleOnChange = (e) => {
//     setStateProduct({
//       ...stateProduct,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleOnChangeDetails = (e) => {
//     setStateProductDetails({
//       ...stateProduct,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleOnChangeAvatar = async ({fileList}) => {
//     const file = fileList[0]
//     if(!file.url && !file.preview){
//       file.preview = await getBase64(file.originFileObj)
//     }
//     setStateProduct({
//       ...stateProduct,
//       image: file.preview
//     })
//     setAvatar(file.preview)
//   }

//   const handleOnChangeAvatarDetails = async ({fileList}) => {
//     const file = fileList[0]
//     if(!file.url && !file.preview){
//       file.preview = await getBase64(file.originFileObj)
//     }
//     setStateProductDetails({
//       ...stateProductDetails,
//       image: file.preview
//     })
//     setAvatar(file.preview)
//   }

//   return (
//     <div>
//         <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
//         <div style={{ marginTop: '10px'}}>
//             <Button style={{height:'150px', width:'150px', borderRadius: '6px', borderStyle:'dashed'}} 
//               onClick={() => setIsModalOpen(true)}
//             >
//                 <PlusOutlined style={{ fontSize:'60px'}} />
//             </Button>
//         </div>
//         <div style={{ marginTop: '20px'}}>
//           <TableComponents columns = {columns} isPending={isPendingProducts} data={dataTable} onRow={(record, rowIndex) => {
//             return {
//               onClick: event => {
//                 setRowSelected(record._id)
//               }
//             } }}/>
//         </div>
//         <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
//           <Form
//             name="basic"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 18 }}
//             style={{ maxWidth: 600 }}
//             onFinish={onFinish}
//             autoComplete="off"
//             form = {form}
//           >
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: 'Please input your name!' }]}
//             >
//               <InputComponent value={stateProduct.name} onChange={handleOnChange} name ="name"/>
//             </Form.Item>

//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[{ required: true, message: 'Please input your type!' }]}
//             >
//               <InputComponent value={stateProduct.type} onChange={handleOnChange} name ="type"/>
//             </Form.Item>

//             <Form.Item
//               label="Count inStock"
//               name="countInStock"
//               rules={[{ required: true, message: 'Please input your count inStock!' }]}
//             >
//               <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name ="countInStock"/>
//             </Form.Item>

//             <Form.Item
//               label="Price"
//               name="price"
//               rules={[{ required: true, message: 'Please input your count price' }]}
//             >
//               <InputComponent value={stateProduct.price} onChange={handleOnChange} name ="price"/>
//             </Form.Item>

//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[{ required: true, message: 'Please input your count description' }]}
//             >
//               <InputComponent value={stateProduct.description} onChange={handleOnChange} name ="description"/>
//             </Form.Item>

//             <Form.Item
//               label="Image"
//               name="image"
//               rules={[{ required: true, message: 'Please input your count image' }]}
//             >
//               <Upload onChange = {handleOnChangeAvatar} maxCount={1}>
//                 <Button>Select File</Button>
//                 {stateProduct?.image && (
//                   <img src={stateProduct?.image} style={{
//                     height: '60px',
//                     width: '60px',
//                     borderRadius:'50%',
//                     objectFit:'cover',
//                     marginLeft: '10px'
//                   }} alt="image" />
//                 )}
//               </Upload>
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//         <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
//         <Form
//             name="basic"
//             labelCol={{ span: 4 }}
//             wrapperCol={{ span: 20 }}
//             style={{ maxWidth: 600 }}
//             onFinish={onFinish}
//             autoComplete="off"
//             form = {form}
//           >
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: 'Please input your name!' }]}
//             >
//               <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name ="name"/>
//             </Form.Item>

//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[{ required: true, message: 'Please input your type!' }]}
//             >
//               <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name ="type"/>
//             </Form.Item>

//             <Form.Item
//               label="Count inStock"
//               name="countInStock"
//               rules={[{ required: true, message: 'Please input your count inStock!' }]}
//             >
//               <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name ="countInStock"/>
//             </Form.Item>

//             <Form.Item
//               label="Price"
//               name="price"
//               rules={[{ required: true, message: 'Please input your count price' }]}
//             >
//               <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name ="price"/>
//             </Form.Item>

//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[{ required: true, message: 'Please input your count description' }]}
//             >
//               <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name ="description"/>
//             </Form.Item>

//             <Form.Item
//               label="Image"
//               name="image"
//               rules={[{ required: true, message: 'Please input your count image' }]}
//             >
//               <Upload onChange = {handleOnChangeAvatar} maxCount={1}>
//                 <Button>Select File</Button>
//                 {stateProductDetails?.image && (
//                   <img src={stateProductDetails?.image} style={{
//                     height: '60px',
//                     width: '60px',
//                     borderRadius:'50%',
//                     objectFit:'cover',
//                     marginLeft: '10px'
//                   }} alt="image" />
//                 )}
//               </Upload>
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//          </DrawerComponent> 
//     </div>
//   )
// }

// export default AdminProduct

import React, { useEffect, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal, Upload, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import TableComponents from '../TableComponents/TableComponents'
import InputComponent from './../InputComponent/InputComponent';
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'

const AdminProduct = () => {
  const user = useSelector((state)=>state?.user)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [avatar, setAvatar] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
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
        rating: res?.data?.rating,
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
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected])

  const handleDetailsProduct = () => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
    setIsOpenDrawer(true)
  }

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ fontSize: '30px', color: 'green', cursor: 'pointer' }} />
        <EditOutlined style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
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

  const mutation = useMutationHooks(
    (data) => { const res = ProductService.createProduct(data)
      return res
    }
  );

  const { data, isPending, isSuccess, isError } = mutation

  const { isPending: isPendingProducts, data: products } = useQuery({ queryKey: ['products'], queryFn: getAllProducts })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess]);

  const onFinish = () => {
    mutation.mutate(stateProduct)
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

  const mutationUpdate = useMutationHooks(
    (data) => { 
      const {id,token,...rests} = data
      const res = ProductService.updateProduct(id,token,rests)
      return res
    }
  );

  const onUpdateProduct = () => {
    mutationUpdate.mutate({rowSelected,isLoadingUpdated, token: user.access_token, stateProductDetails})
    console.log(user.access_token)
  }

  const { data:dataUpdate,isLoading: isLoadingUpdated, isSuccess:isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  
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
        <TableComponents columns={columns} isPending={isPendingProducts} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
      </Modal>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
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
    </div>
  )
}

export default AdminProduct
