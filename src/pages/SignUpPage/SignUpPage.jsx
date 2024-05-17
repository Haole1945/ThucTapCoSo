import React from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const SignUpPage = () => {
  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
      <div style={{width: '500px', height: '420px', background: '#fff'}}>
        <WrapperContainer>
          <h1 style={{fontSize: '32px', fontWeight:'700'}}>Xin Chào,</h1>
          <p style={{fontSize: '20px', marginBottom: '24px'}}>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style = {{marginBottom: '20px'}} placeholder = "abc@gmail.com" />
          <InputForm style = {{marginBottom: '8px'}} placeholder="password"/>
          <InputForm placeholder="confirm password"/>
          <ButtonComponent  
            size={40}
            styleButton ={{
              background: 'rgb(255,57,69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '24px 0 20px'
            }}
            textButton={'Đăng ký'}
            styleTextButton={{color: '#fff'}}
          />
          <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          <p style={{fontSize: '13px', marginTop: '8px'}}>Bạn đã có tài khoản ? <WrapperTextLight>Đăng nhập</WrapperTextLight></p>
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignUpPage
