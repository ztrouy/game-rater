import { Button } from "reactstrap"
import GameList from "../../components/games/GameList"
import { useNavigate } from "react-router"

const Games = () => {
    const navigate = useNavigate()
    
    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <div className="d-flex flex-row w-75 my-2 gap-2">
                <h3 className="text-start">Games</h3>
                <div>
                    <Button size="sm" color="success" onClick={() => navigate("new")}>New Game</Button>
                </div>
            </div>
            <div className="w-75">
                <GameList/>
            </div>
        </div>
    )
}

export default Games