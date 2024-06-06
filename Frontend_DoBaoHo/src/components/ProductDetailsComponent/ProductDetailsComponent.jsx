import React, { useState } from 'react'
import {Row, Col, Image} from 'antd'
import imageProduct from '../../assets/images/test.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, 
         WrapperQualityProduct, WrapperStyleNameProduct } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct,resetOrder } from '../../redux/slides/orderSlide'

const ProductDetailsComponent = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch()
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const location = useLocation()

    const onChange = (value) => {
        setNumProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id){
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);  
        } else if (type === 'decrease' && numProduct > 0) {
            setNumProduct(numProduct - 1);
        }
    }
    
    const {isPending, data: productDetails} = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct})
    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
  return (
        <Row style={{backgroundColor: '#fff'}}>
            <Col span ={10} >
                <Image src={productDetails?.image} alt="image product" preview={false} style = {{width: 'auto', height: '400px'}} />
            </Col>
            <Col span ={14}>
                <WrapperStyleNameProduct>
                    <span style={{color:'red'}}>Tên sản phẩm: </span>
                    {productDetails?.name}</WrapperStyleNameProduct>
                <WrapperPriceProduct>
                    <span style={{color:'red',fontWeight: 'bold'}}>Giá sản phẩm: </span>
                   <span style={{color: ' rgb(0, 0, 255)', fontWeight: 'bold' }}>{productDetails?.price}</span> VNĐ
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span style={{color: 'red', fontWeight: 'bold' }}> Giao đến:  </span>
                    <span>{user?.address}</span> 
                </WrapperAddressProduct>
                <div>
                    <div>Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{border: 'none', background:'transparent'}}>
                            <MinusOutlined style={{color: '#000', fontSize: '20px', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease')}/>
                        </button>
                        <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size ="small" />
                        <button style={{border: 'none', background:'transparent'}}>
                            <PlusOutlined style={{color: '#000', fontSize: '20px', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}/>
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '32px'}}>
                    <ButtonComponent
                        size={40}
                        styleButton ={{
                            background: 'rgb(255,57,69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAddOrderProduct}
                        textButton={'Chọn mua'}
                        styleTextButton={{color: '#fff'}}
                    />
                </div>
            </Col>
        </Row>  
    )
}
export default ProductDetailsComponent
