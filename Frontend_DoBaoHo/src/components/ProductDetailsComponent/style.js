import styled from "styled-components"
import { InputNumber} from 'antd'

export const WrapperStyleNameProduct = styled.h1`
    font-size: 34px;
    color: rgb(36,36,36);
    font-weight: 900;
    line-height: 32px
    word-break: break-word;
    margin-top: 40px
`

export const WrapperPriceProduct = styled.h1`
    border-radius: 4px;
    margin: 24px 0 32px 32px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 28px;
    line-height: 40px;
    font-weight: 500;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    },
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
    margin: 20px 0;
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 92px; 
    margin-top: 16px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm{
        width: 40px;
        border-top: none;
        border-bottom: none;
    }
`