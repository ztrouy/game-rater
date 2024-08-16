import { useEffect, useState } from "react"
import { getGames } from "../../managers/gameManager"
import GameCard from "./GameCard"
import { Button, Input, InputGroup } from "reactstrap"

const GameList = () => {
    const [games, setGames] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const handleSearch = () => {
        const queryParams = `?q=${query}`
        getGames(queryParams).then(setGames)
    }

    return (
        <div className="d-flex flex-column gap-3">
            <InputGroup>
                <Input
                    type="search"
                    placeholder="Search for Game"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <Button onClick={() => handleSearch()}>Search</Button>
            </InputGroup>
            {games.map(game => (<GameCard game={game}  key={`game-${game.id}`}/>))}
        </div>
    )
}

export default GameList