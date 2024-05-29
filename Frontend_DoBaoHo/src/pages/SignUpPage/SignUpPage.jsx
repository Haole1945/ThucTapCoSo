import React, { useEffect, useState } from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as userService from '../../services/userService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {

  const navigate = useNavigate()
  const handleNavigateSignIn = () =>{
    navigate('/sign-in')  
  }
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutationHooks(
    data => userService.signupUser(data)
  )
  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    if(isSuccess) {
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
  }

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
      <div style={{width: '500px', height: '420px', background: '#fff'}}>
        <WrapperContainer>
          <h1 style={{fontSize: '32px', fontWeight:'700'}}>Xin Chào,</h1>
          <p style={{fontSize: '20px', marginBottom: '24px'}}>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style = {{marginBottom: '20px'}} placeholder = "abc@gmail.com" 
            value={email} onChange = {handleOnChangeEmail}
          />

          <div style = {{position:'relative'}}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                fontSize: 15,
                zIndex: 10,
                position: 'absolute',
                top: '8px',
                right:'8px'
              }}
            >{
              isShowPassword ?(<EyeFilled />) : (<EyeInvisibleFilled />)
            }
            </span>
            <InputForm style = {{marginBottom: '8px'}} placeholder="password" type ={isShowPassword ? "text" : "password"} 
              value={password} onChange = {handleOnChangePassword}
            />
          </div>

          <div style = {{position:'relative'}}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                fontSize: 15,
                zIndex: 10,
                position: 'absolute',
                top: '8px',
                right:'8px'
              }}
            >{
              isShowConfirmPassword ?(<EyeFilled />) : (<EyeInvisibleFilled />)
            }
            </span>
            <InputForm placeholder="confirm password" type ={isShowConfirmPassword ? "text" : "password"} 
              value={confirmPassword} onChange = {handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent 
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
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
          </Loading>
          <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          <p style={{fontSize: '13px', marginTop: '8px'}}>Bạn đã có tài khoản ? 
            <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignUpPage
