import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import 'antd/dist/reset.css';
import {useQuery} from '@tanstack/react-query'
import { isJsonString } from './services/utils'
import { jwtDecode } from 'jwt-decode'
import * as userService from './services/userService'
import { useDispatch } from 'react-redux' 
import { updateUser } from './redux/slides/userSlide'

function App() {

  const dispatch = useDispatch();

  const handleGetDetailsUser = async (id, token) => {
    const res = await userService.getDetailsUser(id,token)
    //dispatch(updateUser(...res?.data, access_token: token))
    dispatch(updateUser({ ...res.data, access_token: token }));
  }

  useEffect(() =>{
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id, storageData)
    }
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
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponent : Fragment 
            const Page = route.page
            return (
              <Route key="{route.path}" path={route.path} element = {
              <Layout>
                <Page />
              </Layout>
            } />
            )
          })} 
          
        </Routes>
      </Router>
    </div>
  )
} 

export default App