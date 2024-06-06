import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const DonePage = () => {
  const navigate = useNavigate()
  return (
     <div> 
    <h1> <span style={{cursor: 'pointer', fontWeight:'bold',color:'blue'}} onClick={() => navigate('/')}>Trang chủ</span></h1>   
          <div className="alert success-alert" style={{ backgroundColor: 'lightgreen' }}>
            <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Chúc mừng bạn đặt hàng thành công!</h2>
            <h3 style={{ fontSize: '30px', textAlign: 'center' }}>Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất</h3>
          </div>
    </div>
  );
};


export default DonePage;
