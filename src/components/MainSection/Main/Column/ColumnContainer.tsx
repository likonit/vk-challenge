import { PhotoInfo } from "@/function/getPhotoById";
import Column from "./Column";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToColumn } from "@/store/slices/columns.slice";
import style from "@/css/MainBlock/mainblock.module.css"
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import getRandomPhoto from "@/function/getRandomPhoto";

export default function ColumnContainer({iter}: {iter: number}) {

    let inUpdate = false // здесь используем переменную, потому что inUpdate не влияет на компонент
    const [initFormed, setInitFormed] = useState(false)

    const dispatch = useDispatch()
    const columnRef = useRef<HTMLDivElement | null>(null)
    const count = useSelector((state: RootState) => state.pages.columns)

    async function loadPhoto(limit: number) {

        const response = await getRandomPhoto(limit)
        if (response.status == "ok") {

            const list: PhotoInfo[] =  []
            
            response.data.map((item: PhotoInfo, i: number) => {

                if (i < limit) list.push(item)

            })

            dispatch(addToColumn({
                type: "main",
                index: iter,
                photo: list
            }))

        }

        inUpdate = false

    }

    function handleScroll() {

        const column = columnRef.current
        if (!column || inUpdate || iter > count) return

        const rect = column.lastElementChild?.getBoundingClientRect()

        // если мы находимся в конце колонки - подгружаем еще две фотки.
        if (rect?.bottom && rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {

            inUpdate = true
            loadPhoto(2)

        }

      }
    
      useEffect(() => {

        window.addEventListener("scroll", handleScroll)

        return () => {

            window.removeEventListener("scroll", handleScroll)

        }

      }, [])

    useEffect(() => {

        if (initFormed) return

        (async function () {

            setInitFormed(true)
            loadPhoto(6)

        })()

    })

    return (
        <div className={style.mainblock__column} ref={columnRef}>
            <Column type="main" iter={iter}></Column>
        </div>
    )
}