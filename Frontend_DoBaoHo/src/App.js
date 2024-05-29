import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import 'antd/dist/reset.css';
import {useQuery} from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import * as userService from './services/userService'
import { useDispatch, useSelector } from 'react-redux' 
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'

function App() {

  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() =>{
    setIsPending(true)
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsPending(false)
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }
  const handleGetDetailsUser = async (id, token) => {
    const res = await userService.getDetailsUser(id,token)
    dispatch(updateUser({ ...res.data, access_token: token }))
    setIsPending(false)
  }
  userService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp <currentTime.getTime() / 1000){
      const data = await userService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page                      
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment 
              return (
                <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                <Layout>
                  <Page />
                </Layout>
              } />
              )
            })} 
            
          </Routes>
        </Router>
      </Loading>
    </div>
  )
} 

export default App