const _url = "http://localhost:8000/games"
// const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
// const auth = {headers: {Authorization: token}}

export const getGames = () => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const auth = {headers: {Authorization: token}}
    
    return fetch(_url, auth).then(res => res.json())
}

export const getSingleGame = (id) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const auth = {headers: {Authorization: token}}
    
    return fetch(`${_url}/${id}`, auth).then(res => res.json())
}

export const createGame = (game) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(game)
    }

    return fetch(_url, postOptions)
}

export const updateGame = (game) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(game)
    }

    return fetch(`${_url}/${game.id}`, putOptions)
}