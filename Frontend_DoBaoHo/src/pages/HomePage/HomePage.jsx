import React, { useEffect, useRef, useState } from 'react'
import { WrapperButtonMore, WrapperProducts, WrapperRow,WrapperNavBar } from './style'
import slider_2 from '../../assets/images/slider_2.webp'
import slider_3 from '../../assets/images/slider_3.webp'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent' 
import {Col} from 'antd'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import Loading from '../../components/LoadingComponent/Loading'
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState([])
  const fetchProductAll = async(search) => {
    const res = await ProductService.getAllProduct(search)
    if(search?.length > 0 || refSearch.current){
      setStateProducts(res?.data)
    }else{
      return res
    }  
  } 
  useEffect(() => {
    if(refSearch.current){
      setLoading(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setLoading(false)
  }, [searchDebounce])

  const {isPending,data: products} = useQuery({ queryKey: 'product', queryFn: fetchProductAll })

  useEffect(()=>{
    if(products?.data?.length > 0){
      setStateProducts(products?.data)
    }
  },[products])
  return (
  <Loading isPending={isPending}>
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
            {stateProducts?.map((product)=>{
              console.log('product',product)
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
    </Loading>
  )
}

export default HomePage
