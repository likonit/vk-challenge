import Photo from "../../elements/Photo";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Column({iter, type}: {iter: number, type: "liked" | "main"}) {

    // берем из разных массивов в зависимости от того, на какой странице мы щас.
    const list = useSelector((state: RootState) => type == "liked" ? state.columns.liked : state.columns.main) 
    const liked = useSelector((state: RootState) => state.liked)
    
    return (
        <>{list[iter] ? list[iter].photos.map((item, i) => {
            return <Photo 
            src={item.url} 
            width={item.width}
            height={item.height} 
            key={i}
            id={item.id}
            isLiked={liked.ids.includes(item.id)}></Photo>
        }) : []}</>
    )

}