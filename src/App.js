import React, { Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import 'antd/dist/reset.css';

function App() {

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