import { useEffect, useState } from "react"
import { getGames } from "../../managers/gameManager"
import GameCard from "./GameCard"
import { Button, Input, InputGroup } from "reactstrap"

const GameList = () => {
    const [games, setGames] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [order, setOrder] = useState(0)
    const orderOptions = [
        {id: 0, name: "Order By:", query: ""},
        {id: 1, name: "Year Released", query: "year_released"},
        {id: 2, name: "Designer", query: "designer"},
        {id: 3, name: "Estimated Play Time", query: "estimated_time_to_play"}
    ]

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const handleSearch = () => {
        let queryString = ""
        const searchString = textSearch
        const orderString = orderOptions[order].query
        
        if (searchString) queryString += `q=${textSearch}`
        if (queryString && orderString) queryString += "&"
        if (orderString) queryString += `orderBy=${orderOptions[order].query}`
        
        if (queryString) queryString = `?${queryString}`

        getGames(queryString).then(setGames)
    }

    return (
        <div className="d-flex flex-column gap-3">
            <InputGroup>
                <Input
                    type="select"
                    value={order}
                    onChange={event => setOrder(parseInt(event.target.value))}
                >
                    {orderOptions.map(o => (
                        <option value={o.id} key={`op-${o.id}`}>{o.name}</option>
                    ))}
                </Input>
                <Input
                    type="search"
                    placeholder="Search for Game"
                    value={textSearch}
                    onChange={event => setTextSearch(event.target.value)}
                />
                <Button onClick={() => handleSearch()}>Search</Button>
            </InputGroup>
            {games.map(game => (<GameCard game={game}  key={`game-${game.id}`}/>))}
        </div>
    )
}

export default GameList