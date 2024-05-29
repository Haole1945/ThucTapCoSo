import { Badge, Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HeaderComponent = () => {

  const user = useSelector((state) => state.user)

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
            <WrapperTextHeader>ĐỒ BẢO HỘ XE MÁY</WrapperTextHeader>    
        </Col>
        <Col span={12}>
            <ButtonInputSearch
              size="large"
              textButton="Tìm kiếm"
              placeholder="Nhập từ khóa để tìm kiếm" 
            />
        </Col>
        <Col span={6} style={{display:'flex', gap: '20px', alignItems: 'center'}}>
            <WrapperHeaderAccount>
                <UserOutlined style={{fontSize: '30px'}}/>
                {user?.name ? (
                  <div style={{cursor: 'pointer'}}>{user.name}</div>
                ): (
                  <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                      <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                      <div>
                          <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                          <CaretDownOutlined />
                      </div>
                  </div>
                )}
            </WrapperHeaderAccount>
            <div>
                <Badge count={4} size="small">
                  <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}}/>
                </Badge>
                <span style={{ color: '#fff'}}>Giỏ hàng</span>
            </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
