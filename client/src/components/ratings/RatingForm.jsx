import { useState } from "react"
import { Button, Card, CardText, Input } from "reactstrap"
import { createRating, editRating } from "../../managers/ratingManager"

const RatingForm = ({ game, refreshPage }) => {
    const [rating, setRating] = useState({gameId: game.id, rating: 1})
    
    const handleRateGame = () => {
        if (game.hasRated) {
            editRating(rating)
        } else {
            createRating(rating)
        }

        refreshPage()
    }

    return (
        <Card className="p-3 shadow" outline color="light">
            <CardText className="h6">Rate This Game: {rating.rating}</CardText>
            <Input
                type="range"
                value={rating.rating}
                min={1}
                max={10}
                onChange={event => setRating({...rating, rating: parseInt(event.target.value)})}
            />
            <div className="mt-2">
                <Button onClick={() => handleRateGame()}>Rate Game</Button>
            </div>
        </Card>
    )
}

export default RatingForm