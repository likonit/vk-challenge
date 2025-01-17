import Image from "next/image"
import style from "@/css/MainBlock/mainblock.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addId, removeId, addToRemove, removeFromRemove } from "@/store/slices/liked.slice"
import { useState } from "react"
import { RootState } from "@/store/store"
import { faHeart} from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Photo({src, width, height, isLiked, id}: {src: string, width: number, height: number, isLiked: boolean, id: string}) {

    const [heartVisible, setHeartVisible] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [disabled, setDisabled] = useState(!isLiked)
    const dispatch = useDispatch()
    const page = useSelector((state: RootState) => state.pages.page)

    return (
        <div className={style.photoBlock}>
            <span className={heartVisible ? style.photoBlock__status : style.photoBlock__status_disable}>
                <FontAwesomeIcon className={
                    // логика: уже лайкнут? => окрашиваем в лайкнутый цвет иначе => зависимость от hover
                    !disabled ? style.photoBlock__status__heart_clicked : 
                    (hovered ? style.photoBlock__status__heart_active : style.photoBlock__status__heart)
                }
                icon={!disabled ? faHeart : (hovered ? faHeart :faHeartSolid)}
                onMouseEnter={() => {
                    setHeartVisible(true)
                    setHovered(true)
                }}
                onMouseLeave={() => {
                    setHeartVisible(false)
                    setHovered(false)
                }}
                onClick={() => {

                    if (!disabled) {

                        // было лайкнуто
                        setHovered(false)
                        setDisabled(true)
                        if (page == 0) dispatch(removeId(id))
                            else {
                                // в отличие от главной страницы, мы тут не сразу удаляем из списка
                                // иначе получим ненужный перерендер всей страницы
                                dispatch(addToRemove(id))
                            }

                    } else {
                        
                        // еще не лайкнуто
                        setDisabled(false)
                        if (page == 0) dispatch(addId(id))
                            // удаляем из списка "для уля удаления" :)
                            else dispatch(removeFromRemove(id))
                    
                    }
                        
                }}></FontAwesomeIcon>
            </span>
            <Image 
            className={style.photoBlock__photo} 
            alt="Котик потерялся!" 
            src={src} 
            width={width} 
            height={height}
            onMouseEnter={() => {
                setHeartVisible(true)
            }}
            onMouseLeave={() => {
                setHeartVisible(false)
            }}
            ></Image>
        </div>
    )

}