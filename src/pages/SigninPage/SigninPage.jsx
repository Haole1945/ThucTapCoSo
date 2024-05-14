import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.png'

const SigninPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
    return (
    <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center',background: 'rgba(0,0,0,0.53)',height:'100vh'}}>
      <div style={{ width: '800px',height:'445px', borderRadius:'6px', background:'#fff ',display:'flex' }}>
        <WrapperContainerLeft>
          <h1> xin chao </h1>
          <p> Dang nhap va tao tai khoan </p>
          <InputForm style = {{ marginBottom: '10px' }} placeholder ="abc@gmail.com"/>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
            />
          </div>
          <ButtonComponent
              bordered= {false}
              size={40} 
              styleButton={{
                  background: 'rgb(255,57,69)',
                  height:'48px',
                  width: '100%',
                  border: 'none',
                  borderRadius:'4px',
                  margin: '26px 0 10px'
              }}
              textButton={'Login'}
              styleTextButton={{ color:'#fff', fontSize: '15px', fontWeight:'700' }}
            >
          </ButtonComponent>
          <p><WrapperTextLight>Forgot Password?</WrapperTextLight></p>
          <p>Dont have account? <WrapperTextLight> Create Account</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src = {imageLogo} preview = {false} alt ="image-logo" height="203px" width="203px" />
          <h4>Mua sắm tại </h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SigninPage
