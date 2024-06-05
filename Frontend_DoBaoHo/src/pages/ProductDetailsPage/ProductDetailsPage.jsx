import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{padding: '25px 120px', background: '#efefef', height: 'auto'}}>
        <h1> <span style={{cursor: 'pointer', fontWeight:'bold'}} onClick={() => navigate('/')}>Trang chủ</span>  - Chi tiết sản phẩm</h1>
        <ProductDetailsComponent style={{display: 'flex'}} idProduct={id}/>
    </div>
  )
}

export default ProductDetailsPage
