import Column from "../Main/Column/Column"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { resetLiked } from "@/store/slices/columns.slice"
import { addToColumn } from "@/store/slices/columns.slice"
import { useEffect } from "react"
import style from "@/css/MainBlock/mainblock.module.css"
import getPhotoById from "@/function/getPhotoById"

export default function Favourite() {
    
    const count = useSelector((state: RootState) => state.pages.columns)
    const ids = useSelector((state: RootState) => state.liked.ids)
    const dispatch = useDispatch()

    let formed = false

    useEffect(() => {

        if (formed) return
        formed = true
        dispatch(resetLiked());

        (async function () {

            // будем проходиться по всем лайкнутым фоткам, добавляя поочередно
            // в каждую колонку фотку.
            async function recursion(i: number) {

                if (i == ids.length) return

                const response = await getPhotoById(ids[i])
                if (response.status == "ok") {

                    dispatch(addToColumn({
                        type: "liked",
                        index: i % count,
                        photo: response.data
                    }))

                }

                recursion(i+1)

            }

            recursion(0)

        }) ()
    })

    return (
        <section className={style.mainblock}>
            {function () {

                const toRet: React.ReactNode[] = []
                for (let i = 0; i < count; i++) {

                    toRet.push(
                        <div className={style.mainblock__column} key={i}>
                            <Column iter={i} type="liked"></Column>
                        </div>
                    )
                    
                }
                
                return toRet
                
            }()}
        </section>
    )
    
}