import Menu from "./Menu/Menu";
import style from "@/css/Menu/header.module.css"

export default function Header() {

    return (
        <header className={style.header}>
            <Menu></Menu>
        </header>
    )

}