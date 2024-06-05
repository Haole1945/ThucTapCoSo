import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {Row, Col} from 'antd'

export const WrapperButtonMore = styled(ButtonComponent)`
    background-color: rgb(255,255,0)
    &:hover {
        opacity: 0.8;
    }
    width: 100%;
    text-align: center;
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
`

export const WrapperRow = styled(Row)`
    padding: 40px 120px; 
    margin-top: 40px;
    background-color: #efefef;
    height: auto; 
    width: 100%;
`

export const WrapperNavBar = styled(Col)`
    background-color: #fff;
    height: fit-content;
    padding: 20px 20px;
`