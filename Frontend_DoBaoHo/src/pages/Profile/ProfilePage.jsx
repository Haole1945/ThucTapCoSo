import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as userService from '../../services/userService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'



const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const {id,access_token, ...rests } = data
            userService.updateUser(id, rests, access_token)}
      )
    
      const dispatch = useDispatch()
      const {data, isPending, isSuccess, isError} = mutation
      console.log('dataa',data)

    useEffect(() => {   
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        // setAvatar(user?.avatar)
    },[user])

    useEffect(() => {
        if (isSuccess){
            message.success()
            handleGetDetailsUser(user?.id,user?.access_token)
        }else if (isError){
            message.error()
        }
    },[isSuccess, isError])
    const handleGetDetailsUser = async (id, token) => {
        const res = await userService.getDetailsUser(id,token)
        dispatch(updateUser({ ...res.data, access_token: token }));
      }
    
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }
    // const handleOnChangeAvatar = (value) => {
    //     setAvatar(value)
    // }
    const handleUpdate = () =>{
        mutation.mutate({ id: user?.id, email, name, phone, address,access_token : user?.access_token})
       
    }
 
    return (
    <div style={{ width:'1270px', margin: '0 auto', height: '500px' }}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <Loading isPending={isPending}>
        <WrapperContentProfile>
        <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm style={{width: '300px'}} id="name" value={name} onChange = {handleOnChangeName}/>
            <ButtonComponent  
              onClick={handleUpdate}
              size={40}
              styleButton ={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{color: 'rgb(26,148,255)',fontSize:'15px',fontWeight: '700'}}
            />
        </WrapperInput>
        <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm style={{width: '300px'}} id="email" value={email} onChange = {handleOnChangeEmail}/>
            <ButtonComponent  
              onClick={handleUpdate}
              size={40}
              styleButton ={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{color: 'rgb(26,148,255)',fontSize:'15px',fontWeight: '700'}}
            />
        </WrapperInput>
        <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm style={{width: '300px'}} id="phone" value={phone} onChange = {handleOnChangePhone}/>
            <ButtonComponent  
              onClick={handleUpdate}
              size={40}
              styleButton ={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{color: 'rgb(26,148,255)',fontSize:'15px',fontWeight: '700'}}
            />
        </WrapperInput>
        {/* <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <InputForm style={{width: '300px'}} id="avatar" value={avatar} onChange = {handleOnChangeAvatar}/>
            <ButtonComponent  
              onClick={handleUpdate}
              size={40}
              styleButton ={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{color: 'rgb(26,148,255)',fontSize:'15px',fontWeight: '700'}}
            />
        </WrapperInput> */}
        <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm style={{width: '300px'}} id="address" value={address} onChange = {handleOnChangeAddress}/>
            <ButtonComponent  
              onClick={handleUpdate}
              size={40}
              styleButton ={{
                height: '30px',
                width: 'fit-content',
                borderRadius: '4px',
                padding: '2px 6px 6px'
              }}
              textButton={'Cập nhật'}
              styleTextButton={{color: 'rgb(26,148,255)',fontSize:'15px',fontWeight: '700'}}
            />
        </WrapperInput>
        </WrapperContentProfile>
        </Loading>
    </div>
  )
}

export default ProfilePage
