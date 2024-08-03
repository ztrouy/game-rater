import { useEffect, useState } from "react"
import { getGames } from "../../managers/gameManager"
import GameCard from "./GameCard"

const GameList = () => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    return (
        <div className="d-flex flex-column gap-3">
            {games.map(game => (<GameCard game={game}  key={`game-${game.id}`}/>))}
        </div>
    )
}

export default GameList