const _url = "http://localhost:8000/reviews"
// const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
// const auth = {headers: {Authorization: token}}

export const createReview = (review) => {
    const token = `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(review)
    }

    return fetch(_url, postOptions)
}