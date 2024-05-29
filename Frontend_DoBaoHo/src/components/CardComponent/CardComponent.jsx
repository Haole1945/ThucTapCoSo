
import React from 'react'
import { StyleNameProduct, WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle } from './style';

const CardComponent = (props) => {
  const {countInStock,description,image,name,price,type} = props
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{width: 200}}
        bodyStyle={{ padding:'10px'}}
        cover={<img alt="example" src="https://bikersaigon.net/wp-content/uploads/2016/07/khan-ninja-loai-tot-mau-xam.jpg" />}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperPriceText>
        <span style={{ marginRight: '8px'}}>{price}</span>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
