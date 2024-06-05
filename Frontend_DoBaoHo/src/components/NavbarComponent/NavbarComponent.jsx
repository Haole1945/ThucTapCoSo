// import React, { useEffect, useState } from 'react'
// import { WrapperLabelText, WrapperTextValue, WrapperContent } from './style'
// import * as ProductService from '../../services/ProductService'

// const NavbarComponent = () => {
//   const [typeProducts, setTypeProducts] = useState([])
//   const [products, setProducts] = useState([])
  
//   const fetchProductType = async (type) => {
//     const res = await ProductService.getProductType(type)
//     if(res?.data == 'OK'){
//       setProducts(res?.data)
//     }else{
 
//     }
//   }

//   useEffect(() => {
//     fetchProductType()
//   }, [])    

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct()
//     if(res?.status === 'OK'){
//       setTypeProducts(res?.data)
//     }
//   }

//   useEffect(() => {
//     fetchAllTypeProduct()
//   }, [])


//   const renderContent = (type, options) => {
//     switch(type) {
//         case 'text':
//             return options.map((option) => {
//                 return (
//                     <WrapperTextValue style={{cursor: 'pointer'}} onClick={() => fetchProductType(option)}>{option}</WrapperTextValue>
//                 )
//             })
//         default:
//             return {}
//     }
//   }
//   return (
//     <div>
//         <WrapperLabelText>Danh mục</WrapperLabelText>
//         <WrapperContent>
//             {renderContent('text',typeProducts)}
//         </WrapperContent>
//     </div>
//   )
// }

// export default NavbarComponent

//2
// import React, { useEffect, useState } from 'react';
// import { WrapperLabelText, WrapperTextValue, WrapperContent } from './style';
// import * as ProductService from '../../services/ProductService';
// import { Button } from 'antd';

// const NavbarComponent = ({ onUpdateProducts }) => {
//   const [typeProducts, setTypeProducts] = useState([]);
//   const [products, setProducts] = useState([]);

//   const fetchProductType = async (type) => {
//     try {
//       const res = await ProductService.getProductType(type);
//       if (res?.status === 'OK') {
//         setProducts(res.data);
//         onUpdateProducts(res.data); // Gọi callback để cập nhật products trong HomePage
//       } else {
//         console.error('Failed to fetch products');
//       }
//     } catch (error) {
//       console.error('Error fetching product type:', error);
//     }
//   };

//   const fetchAllTypeProduct = async () => {
//     try {
//       const res = await ProductService.getAllTypeProduct();
//       if (res?.status === 'OK') {
//         setTypeProducts(res.data);
//       } else {
//         console.error('Failed to fetch product types');
//       }
//     } catch (error) {
//       console.error('Error fetching all product types:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllTypeProduct();
//   }, []);

//   const renderContent = (type, options) => {
//     if (type === 'text') {
//       return options.map((option, index) => (
//         <WrapperTextValue
//           key={index}
//           style={{ cursor: 'pointer' }}
//           onClick={() => fetchProductType(option)}
//         >
//           {option}
//         </WrapperTextValue>
//       ));
//     }
//     return null;
//   };

//   return (
//     <div>
//       <WrapperLabelText>Danh mục</WrapperLabelText>
//       <WrapperContent>{renderContent('text', typeProducts)}</WrapperContent>
//       <Button><span style={{border: 'none', }}>Tất cả sản phẩm</span></Button>
//     </div>
//   );
// };

// export default NavbarComponent;

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
        onUpdateProducts(res.data); // Call callback to update products in HomePage
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching product type:', error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      if (res?.status === 'OK') {
        onUpdateProducts(res.data); // Reset to all products
      } else {
        console.error('Failed to fetch all products');
      }
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === 'OK') {
        setTypeProducts(res.data);
      } else {
        console.error('Failed to fetch product types');
      }
    } catch (error) {
      console.error('Error fetching all product types:', error);
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
