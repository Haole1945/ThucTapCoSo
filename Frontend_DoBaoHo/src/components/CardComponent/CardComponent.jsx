
import React from 'react'
import { StyleNameProduct, WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle } from './style';
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
  const {countInStock, description, image, name, price, type, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{width: 200}}
        bodyStyle={{ padding:'10px'}}
        cover={<img alt="example" src={image} />}
        onClick={() => handleDetailsProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperPriceText>
        <span><span style={{ marginRight: '8px'}}>{price?.toLocaleString()}</span>VNĐ</span>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
