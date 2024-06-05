import React, { useState } from 'react'
import {Row, Col, Image} from 'antd'
import imageProduct from '../../assets/images/test.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, 
         WrapperQualityProduct, WrapperStyleNameProduct } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const ProductDetailsComponent = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
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
        if(type === 'increase'){
            setNumProduct(numProduct + 1)
        }
        else {
            setNumProduct(numProduct - 1)
        }
    }

    const {isPending, data: productDetails} = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct})

  return (
        <Row style={{backgroundColor: '#fff'}}>
            <Col span ={10} >
                <Image src={productDetails?.image} alt="image product" preview={false} style = {{width: 'auto', height: '400px'}} />
            </Col>
            <Col span ={14}>
                <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span> Giao đến</span>
                    <span className='address'>{user?.address}</span> - 
                    <span className='change-address'> Đổi địa chỉ</span>
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
                        textButton={'Chọn mua'}
                        styleTextButton={{color: '#fff'}}
                    />
                </div>
            </Col>
        </Row>  
    )
}

export default ProductDetailsComponent
