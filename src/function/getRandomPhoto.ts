export default async function getRandomPhoto(limit: number) {

    try {

        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`)
        return {status: "ok", data: await response.json()}

    } catch(e) {

        return {status: "error"}

    }

}