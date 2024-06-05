// import React, { useEffect, useRef, useState } from 'react'
// import { WrapperButtonMore, WrapperProducts, WrapperRow,WrapperNavBar } from './style'
// import slider_2 from '../../assets/images/slider_2.webp'
// import slider_3 from '../../assets/images/slider_3.webp'
// import SliderComponent from '../../components/SliderComponent/SliderComponent'
// import CardComponent from '../../components/CardComponent/CardComponent'
// import NavbarComponent from '../../components/NavbarComponent/NavbarComponent' 
// import {Col} from 'antd'
// import { useQuery } from '@tanstack/react-query'
// import * as ProductService from '../../services/ProductService'
// import { useSelector } from 'react-redux'
// import { useDebounce } from '../../hooks/useDebounce'
// import Loading from '../../components/LoadingComponent/Loading'


// const HomePage = () => {
//   const searchProduct = useSelector((state) => state?.product?.search)
//   const searchDebounce = useDebounce(searchProduct, 500)
//   const [loading, setLoading] = useState(false)
//   const [limit, setLimit] = useState(6)

//   const fetchProductAll = async(context) => {
//     const limit = context?.queryKey && context.queryKey[1]
//     const search = context?.queryKey && context.queryKey[2]
//     const res = await ProductService.getAllProduct(search, limit)
//     return res
//   } 

//   const {isPending, data: products} = useQuery({ queryKey: ['product', limit, searchDebounce], queryFn: fetchProductAll })

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct()
//     return res
//   }

//   useEffect (() => {
//     fetchAllTypeProduct()
//   }, [])

//   return (
//   <Loading isPending={isPending}>
//     <div className="container" style={{marginTop: '32px'}}>
//       <div style={{width: '100%', padding: '0 80px'}}>
//           <SliderComponent arrImages={[slider_2, slider_3]} />
//       </div>
//       <WrapperRow>
//         <WrapperNavBar span={6} >
//           <NavbarComponent />
//         </WrapperNavBar>
//         <Col span={18}>
//           <WrapperProducts>
//             {products?.data?.map((product)=>{
//               return(
//                 <CardComponent 
//                   key={product.id} 
//                   countInStock={product.countInStock} 
//                   description = {product.description} 
//                   image = {product.image} 
//                   name={product.name}
//                   price={product.price}
//                   type={product.type}
//                   id={product._id}       
//                 />  
//               )
//             })}
//           </WrapperProducts>
//           <div style = {{width: '100%', display: 'flex', justifyContent:'center', marginTop: '20px'}}>
//             <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
//               color:'#000', width: '240px', height: '38px', backgroundColor:'yellow',
//               borderRadius: '4px', border: 'none', border: '1px solid black'
//             }}  
//             styleTextButton={{fontWeight: 500}} 
//             onClick={() => setLimit ((prev) => prev + 6)}/>
//           </div>
//         </Col>
//       </WrapperRow>
//     </div>
//     </Loading>
//   )
// }

// export default HomePage


import React, { useEffect, useState } from 'react';
import { WrapperButtonMore, WrapperProducts, WrapperRow, WrapperNavBar } from './style';
import slider_2 from '../../assets/images/slider_2.webp';
import slider_3 from '../../assets/images/slider_3.webp';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col } from 'antd';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import Loading from '../../components/LoadingComponent/Loading';
import NavbarComponent from '../../components/NavbarComponent/NavBarComponent';
const fetchProductAll = async (context) => {
  const limit = context.queryKey[1];
  const search = context.queryKey[2];
  const res = await ProductService.getAllProduct(search, limit);
  return res;
};

const fetchAllTypeProduct = async () => {
  const res = await ProductService.getAllTypeProduct();
  return res;
};

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [limit, setLimit] = useState(6);
  const [products, setProducts] = useState([]);

  const { isPending, data } = useQuery({
    queryKey: ['product', limit, searchDebounce],
    queryFn: fetchProductAll,
  });

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  const handleProductUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <Loading isPending={isPending}>
      <div className="container" style={{ marginTop: '32px' }}>
        <div style={{ width: '100%', padding: '0 80px' }}>
          <SliderComponent arrImages={[slider_2, slider_3]} />
        </div>
        <WrapperRow>
          <WrapperNavBar span={6}>
            <NavbarComponent onUpdateProducts={handleProductUpdate} />
          </WrapperNavBar>
          <Col span={18}>
            <WrapperProducts>
              {products.map((product) => (
                <CardComponent
                  key={product.id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  type={product.type}
                  id={product._id}
                />
              ))}
            </WrapperProducts>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <WrapperButtonMore
                textButton="Xem thêm"
                type="outline"
                styleButton={{
                  color: '#000',
                  width: '240px',
                  height: '38px',
                  backgroundColor: 'yellow',
                  borderRadius: '4px',
                  border: 'none',
                  border: '1px solid black',
                }}
                styleTextButton={{ fontWeight: 500 }}
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </Col>
        </WrapperRow>
      </div>
    </Loading>
  );
};

export default HomePage;
