const _url = "http://localhost:8000/categories"
const _token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
const _getAuth = {headers: {Authorization: _token}}

export const getCategories = () => {
    return fetch(_url, _getAuth).then(res => res.json())
}