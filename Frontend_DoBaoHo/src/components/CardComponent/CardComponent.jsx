
import React from 'react'
import { StyleNameProduct, WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle } from './style';

const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{width:'200px', height:'200px'}}
        style={{width: 200}}
        bodyStyle={{ padding:'10px'}}
        cover={<img alt="example" src="https://bikersaigon.net/wp-content/uploads/2016/07/khan-ninja-loai-tot-mau-xam.jpg" />}
    >
      <StyleNameProduct>KHĂN TRÙM ĐẦU NINJA</StyleNameProduct>
      {/* <WrapperReportText>
        <span style = {{marginRight: '4px'}}>
          <span>4.5 <StarFilled style={{fontSize:'10px', color: 'yellow'}} /></span>
          <span> | Đã bán 1000+</span>
        </span>
      </WrapperReportText> */}
      <WrapperPriceText>
        1.000.000
        <WrapperPriceDiscountText>-5%</WrapperPriceDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
