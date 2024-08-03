import GameList from "../../components/games/GameList"

const Games = () => {
    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <div className="w-75 my-2">
                <h3 className="text-start">Games</h3>
            </div>
            <div className="w-75">
                <GameList/>
            </div>
        </div>
    )
}

export default Games