export const login = (data) => {
    const postOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }

    return fetch("http://localhost:8000/login", postOptions).then(res => res.json())
}

export const register = (data) => {
    const postOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }

    return fetch("http://localhost:8000/register", postOptions).then(res => res.json())
}