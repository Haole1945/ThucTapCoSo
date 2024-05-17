import React from 'react'
import {Input} from 'antd'

const InputComponent = (props) => {
  const { size, placeholder, style, ...rest } = props
  return (
    <Input 
      size={size}
      placeholder={placeholder} 
      style={style} 
      {...rest}
    />
  )
}


export default InputComponent
