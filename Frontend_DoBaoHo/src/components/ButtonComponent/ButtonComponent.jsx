import React from 'react'
import {Button} from 'antd'

const ButtonComponent = (props) => {
  const {size,styleButton, styleTextButton,textButton, ...rest} = props
  return (
    <Button 
            size={size} 
            //style={{background: backgroundColorButton, border: 'rgb(13, 92, 182)'}} 
            style={styleButton}
            //icon={<SearchOutlined color={colorButton}/>}
            {...rest}
    >
            <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButtonComponent
