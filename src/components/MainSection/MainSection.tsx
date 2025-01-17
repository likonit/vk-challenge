import Main from "./Main/Main"
import Favourite from "./Favourite/Favourite"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux";
import { removeArray } from "@/store/slices/liked.slice";
import { useEffect, useState } from "react";
import { changeColumnCount } from "@/store/slices/pages.slice";
export default function MainSection() {

    const page = useSelector((store: RootState) => store.pages.page)
    const dispatch = useDispatch()

    function updateCount() {

        dispatch(changeColumnCount(window.innerWidth > 740 ? 5 : (window.innerWidth >= 476 ? 3 : 2)))

    }

    useEffect(() => {

        updateCount()
        window.addEventListener("resize", updateCount)

        return () => {

            window.removeEventListener("resize", updateCount)

        }
 
    })

    useEffect(() => {

        if (page == 0) dispatch(removeArray())
            
    })
    
    return (
        <>{page == 0 ? <Main></Main> : <Favourite></Favourite>}</>
    )
    
}