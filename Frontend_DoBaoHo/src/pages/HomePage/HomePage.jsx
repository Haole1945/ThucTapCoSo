import React from 'react'
import { WrapperButtonMore, WrapperProducts, WrapperRow,WrapperNavBar } from './style'
import slider_2 from '../../assets/images/slider_2.webp'
import slider_3 from '../../assets/images/slider_3.webp'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent' 
import {Col} from 'antd'

const HomePage = () => {
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
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent /><CardComponent /><CardComponent />
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
