const _url = "http://localhost:8000/games"
const _token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
const _getAuth = {headers: {Authorization: _token}}

export const getGames = () => {
    return fetch(_url, _getAuth).then(res => res.json())
}

export const getSingleGame = (id) => {
    return fetch(`${_url}/${id}`, _getAuth).then(res => res.json())
}