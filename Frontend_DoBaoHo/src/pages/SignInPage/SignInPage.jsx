import React, { useEffect, useState } from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as userService from '../../services/userService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import {jwtDecode} from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const mutation = useMutationHooks(
    data => userService.loginUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    if(isSuccess) {
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await userService.getDetailsUser(id,token)
    //dispatch(updateUser(...res?.data, access_token: token))
    dispatch(updateUser({ ...res.data, access_token: token }));
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
      <div style={{width: '500px', height: '420px', background: '#fff'}}>
        <WrapperContainer>
          <h1 style={{fontSize: '32px', fontWeight:'700'}}>Xin Chào,</h1>
          <p style={{fontSize: '20px', marginBottom: '24px'}}>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style = {{marginBottom: '16px'}} placeholder = "abc@gmail.com" 
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
            <InputForm placeholder="password" type ={isShowPassword ? "text" : "password"} 
              value={password} onChange = {handleOnChangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent  
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton ={{
                background: 'rgb(255,57,69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '32px 0 20px'
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{color: '#fff'}}
            />
          </Loading>
          <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          <p style={{fontSize: '13px', marginTop: '8px'}}>Bạn chưa có tài khoản ? 
            <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignInPage
