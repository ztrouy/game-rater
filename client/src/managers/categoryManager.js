const _url = "http://localhost:8000/categories"
// const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
// const auth = {headers: {Authorization: token}}

export const getCategories = () => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const auth = {headers: {Authorization: token}}
    
    return fetch(_url, auth).then(res => res.json())
}