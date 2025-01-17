import { changePage } from "@/store/slices/pages.slice";
import { removeArray } from "@/store/slices/liked.slice";
import { useDispatch } from "react-redux";
import style from "@/css/Menu/header.module.css"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Menu() {

    const dispatch = useDispatch()
    const page = useSelector((state: RootState) => state.pages.page)

    return (
        <nav>
            <ul>
                <li 
                className={page == 1 ? style.header__menu_elm : style.header__menu_elm_active}
                onClick={() => {

                    // очищаем дизлайкнутых котов.
                    dispatch(removeArray())
                    dispatch(changePage(0))}

                }>
                    <a>Все котики</a>
                </li>
                <li 
                className={page == 0 ? style.header__menu_elm : style.header__menu_elm_active}
                onClick={() => {dispatch(changePage(1))}}
                >
                    <a>Любимые котики</a>
                </li>
            </ul>
        </nav>
    )
}