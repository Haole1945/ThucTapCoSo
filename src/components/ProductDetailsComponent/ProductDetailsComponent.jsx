import React from 'react'
import {Row, Col, Image} from 'antd'
import imageProduct from '../../assets/images/test.jpg'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, 
         WrapperQualityProduct, WrapperStyleNameProduct } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
    const onChange = () => {}
  return (
        <Row style={{backgroundColor: '#fff'}}>
            <Col span ={10} >
                <Image src={imageProduct} alt="image product" preview={false} style = {{width: 'auto', height: '400px'}} />
            </Col>
            <Col span ={14}>
                <WrapperStyleNameProduct>Trum dau ninja</WrapperStyleNameProduct>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span> Giao đến</span>
                    <span className='address'> Q.1, P.Bến Nghé, Hồ Chí Minh</span> - 
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div>
                    <div>Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{border: 'none', background:'transparent'}}>
                            <MinusOutlined style={{color: '#000', fontSize: '20px'}}/>
                        </button>
                        <WrapperInputNumber defaultValue={1} onChange={onChange} size ="small" />
                        <button style={{border: 'none', background:'transparent'}}>
                            <PlusOutlined style={{color: '#000', fontSize: '20px'}}/>
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
