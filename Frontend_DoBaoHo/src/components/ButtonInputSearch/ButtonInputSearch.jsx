import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
  const {
    size, placeholder, textButton, 
    backgroundColorInput = "#fff", 
    backgroundColorButton = '#5F00A0', 
    colorButton = '#fff'
    }= props
  return (
    <div style = {{display:'flex'}}>   
        <InputComponent 
            size={size}
            placeholder = {placeholder}  
            style={{backgroundColor: backgroundColorInput}} 
            {...props}
        />                            
        <ButtonComponent 
            size={size} 
            styleButton={{background: backgroundColorButton, border: backgroundColorButton}} 
            icon={<SearchOutlined color={colorButton} style={{color: '#fff'}}/>}
            textButton = {textButton}
            styleTextButton={{color: colorButton}}
        />
    </div>
  )
}

export default ButtonInputSearch
