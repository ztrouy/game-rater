const _url = "http://localhost:8000/ratings"
// const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
// const auth = {headers: {Authorization: token}}

export const createRating = (rating) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(rating)
    }

    return fetch(_url, postOptions)
}

export const editRating = (rating) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(rating)
    }

    return fetch(_url + "/edit", putOptions)
}