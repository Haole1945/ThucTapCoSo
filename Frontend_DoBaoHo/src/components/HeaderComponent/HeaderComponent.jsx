import { Badge, Button, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as userService from '../../services/userService'
import {resetUser} from '../../redux/slides/userSlide'
import { searchProduct } from '../../redux/slides/productSlide'


const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()
  const [search,setSearch] = useState('')
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async() => {
    await userService.logoutUser()
    dispatch(resetUser())
  }

  useEffect(() =>{
    
    setUserName(user?.name)
   
  },[user?.name])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        
        
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  )
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div>
      <WrapperHeader gutter={16} style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
        <Col span={6}>
            <WrapperTextHeader>ĐỒ BẢO HỘ XE MÁY</WrapperTextHeader>    
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              textButton="Tìm kiếm"
              placeholder="Nhập từ khóa để tìm kiếm" 
              onChange = {onSearch}
            />
        </Col>
        )}
        
        <Col span={6} style={{display:'flex', gap: '20px', alignItems: 'center'}}>
            <WrapperHeaderAccount>
                <UserOutlined style={{fontSize: '30px'}}/>
                {user?.access_token ? (
                  <>
                  <Popover content={content} trigger="click" >
                    <div style={{cursor: 'pointer'}}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                  </>
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
            {!isHiddenCart && (
              <div onClick={()=> navigate('/order')} style={{cursor:'pointer'}}>
                <Badge count={4} size="small">
                  <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}}/>
                </Badge>
                <span style={{ color: '#fff'}}>Giỏ hàng</span>
              </div>
            )}
            
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
