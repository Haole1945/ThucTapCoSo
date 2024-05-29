import React from 'react'
import {Button} from 'antd'

const ButtonComponent = (props) => {
  const {size,styleButton, styleTextButton,textButton, disabled, ...rest} = props
  return (
    <Button 
      style = {{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background
      }}
      size={size} 
      //style={{background: backgroundColorButton, border: 'rgb(13, 92, 182)'}} 
      //icon={<SearchOutlined color={colorButton}/>}
      {...rest}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponent
