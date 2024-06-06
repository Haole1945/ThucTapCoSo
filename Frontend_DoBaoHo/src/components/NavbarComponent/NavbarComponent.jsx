import React, { useEffect, useState } from 'react';
import { WrapperLabelText, WrapperTextValue, WrapperContent } from './style';
import * as ProductService from '../../services/ProductService';
import { Button } from 'antd';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const NavbarComponent = ({ onUpdateProducts }) => {
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductType = async (type) => {
    try {
      const res = await ProductService.getProductType(type);
      if (res?.status === 'OK') {
        onUpdateProducts(res.data); 
      } else {
        console.error('lỗi fetch product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      if (res?.status === 'OK') {
        onUpdateProducts(res.data); 
      } else {
        console.error('lỗi fetch product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === 'OK') {
        setTypeProducts(res.data);
      } else {
        console.error('lỗi fetch product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const renderContent = (type, options) => {
    if (type === 'text') {
      return options.map((option, index) => (
        <WrapperTextValue
          key={index}
          style={{ cursor: 'pointer' }}
          onClick={() => fetchProductType(option)}
        >
          {option}
        </WrapperTextValue>
      ));
    }
    return null;
  };

  return (
    <div>
      <WrapperLabelText>Danh mục</WrapperLabelText>
      <WrapperContent>
        {renderContent('text', typeProducts)}
        <span onClick={fetchAllProducts} style={{ border: 'none', cursor: 'pointer', fontSize:'16px' }}>Tất cả sản phẩm</span>
      </WrapperContent>
    </div>
  );
};

export default NavbarComponent;
