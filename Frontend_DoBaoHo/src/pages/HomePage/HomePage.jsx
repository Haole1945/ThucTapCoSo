import React from 'react'
import { WrapperButtonMore, WrapperProducts, WrapperRow,WrapperNavBar } from './style'
import slider_2 from '../../assets/images/slider_2.webp'
import slider_3 from '../../assets/images/slider_3.webp'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent' 
import {Col} from 'antd'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'

const HomePage = () => {
  
  const fetchProductAll = async() => {
    const res = await ProductService.getAllProduct()
    console.log('res',res)
    return res
  } 
  const {isPending,data: products} = useQuery({ queryKey: 'product', queryFn: fetchProductAll })

  console.log('data',products)
  return (
    <div className="container" style={{marginTop: '32px'}}>
      <div style={{width: '100%', padding: '0 80px'}}>
          <SliderComponent arrImages={[slider_2, slider_3]} />
      </div>
      <WrapperRow>
        <WrapperNavBar span={6} >
          <NavbarComponent />
        </WrapperNavBar>
        <Col span={18}>
          <WrapperProducts>
            {products?.data?.map((product)=>{
              return(
                <CardComponent 
                  key={product.id} 
                  countInStock={product.countInStock} 
                  description = {product.description} 
                  image = {product.image} 
                  name={product.name}
                  price={product.price}
                  type={product.type}
                            
                />  
              )
            })}
            
            {/* <CardComponent />
            <CardComponent />
            <CardComponent /><CardComponent /><CardComponent /> */}
          </WrapperProducts>
          <div style = {{width: '100%', display: 'flex', justifyContent:'center', marginTop: '20px'}}>
            <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
              color:'#fff', backgroundColor:'rgb(70,0,0)', border: '1px solid #000000',
              width: '240px', height: '38px', borderRadius: '4px'
            }}
            styleTextButton={{fontWeight: 500}}/>
          </div>
        </Col>
      </WrapperRow>
    </div>
  )
}

export default HomePage
