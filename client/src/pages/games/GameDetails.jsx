import { useEffect, useState } from "react"
import { getSingleGame } from "../../managers/gameManager"
import GameCardDetailed from "../../components/games/GameCardDetailed"
import { useNavigate, useParams } from "react-router"
import { Button } from "reactstrap"

const GameDetails = () => {
    const [game, setGame] = useState()
    const { gameId } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        getSingleGame(gameId).then(setGame)
    }, [gameId])

    if (!game) return (<>Loading...</>)

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="w-75 mt-2">
                <Button onClick={() => navigate("/games")}>Go Back</Button>
            </div>
            <div className="w-75 mt-2">
                <GameCardDetailed game={game}/>
            </div>
        </div>
    )
}

export default GameDetails