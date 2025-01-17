import React from "react"
import ColumnContainer from "./Column/ColumnContainer"
import style from "@/css/MainBlock/mainblock.module.css"

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function Main() {

    const count = useSelector((state: RootState) => state.pages.columns)

    return (
        <section className={style.mainblock}>
            {function () {

                const toRet: React.ReactNode[] = []
                for (let i = 0; i < count; i++) {

                    toRet.push(<ColumnContainer key={i} iter={i}></ColumnContainer>)
                    
                }
                
                return toRet
                
            }()}
        </section>
    )
    
}