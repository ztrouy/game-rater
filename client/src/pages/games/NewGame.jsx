import GameForm from "../../components/games/GameForm"

const NewGame = () => {
    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <div className="w-75 mt-3">
                <h3>New Game</h3>
            </div>
            <div className="w-75 mt-3">
                <GameForm/>
            </div>
        </div>
    )
}

export default NewGame