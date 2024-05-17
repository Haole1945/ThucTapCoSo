
import {Card} from 'antd'
import styled from "styled-components"

export const WrapperCardStyle = styled(Card)`
    width: 200px
    & img {
        height: 200px;
        width: 200px
    }
    background-color: black;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: white;
    font-weight: 400;
    margin: 16px 0 4px;
`

// export const WrapperReportText = styled.div`
//     font-size: 10px;
//     color: rgb(128, 128, 137);
//     display: flex;
//     align-items: center;
//     margin: 6px 0 0px;
// `

export const WrapperPriceText = styled.div`
    color: yellow;
    font-weight: 500;
    font-size: 16px;
    margin: 12px 0 8px;
    text-align: center;
`
export const WrapperPriceDiscountText = styled.span`
    color: rgb(255,66,78);
    font-weight: 500;
    font-size: 12px;
`