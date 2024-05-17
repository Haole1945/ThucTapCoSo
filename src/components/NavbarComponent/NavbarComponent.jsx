import React from 'react'
import { WrapperLabelText, WrapperTextValue, WrapperContent } from './style'

const NavbarComponent = () => {
  const renderContent = (type, options) => {
    switch(type) {
        case 'text':
            return options.map((option) => {
                return (
                    <WrapperTextValue>{option}</WrapperTextValue>
                )
            })
        default:
            return {}
    }
  }
  return (
    <div>
        <WrapperLabelText>Label</WrapperLabelText>
        <WrapperContent>
            {renderContent('text',['Mu bao hiem', 'Ao quan bao ho moto', 'gang tay'])}
        </WrapperContent>
    </div>
  )
}

export default NavbarComponent
