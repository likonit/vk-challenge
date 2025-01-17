export interface PhotoInfo {
    id: string,
    url: string,
    width: number,
    height: number
}

export default async function getPhotoById(id: string) {

    try {

        const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`)
        return {status: "ok", data: [(await response.json())]}

    } catch(e) {

        return {status: "error"}

    }

}