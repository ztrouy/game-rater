import { useNavigate } from "react-router"
import { Badge, Button, Card, CardText, CardTitle } from "reactstrap"

const GameCardDetailed = ({ game }) => {
    const navigate = useNavigate()
    
    return (
        <Card className="p-3 shadow" outline color="light">
            <CardTitle className="h5 mb-0">{game.title}</CardTitle>
            <CardText className="mb-1 mt-0">{game.designer} - {game.yearReleased}</CardText>
            <div className="d-flex flex-row gap-2">
                {game.categories.map(c => (
                    <Badge pill key={`cat-${c.id}`}>{c.name}</Badge>
                ))}
            </div>
            <CardText className="my-2">{game.description}</CardText>
            <CardText className="fst-italic">
                {game.numberOfPlayers} Players - Ages {game.ageRecommendation}+ - {game.estimatedTimeToPlay} Minutes
            </CardText>
            {game.isOwner && (
                <div>
                    <Button onClick={() => navigate("edit")}>Edit</Button>
                </div>
            )}
        </Card>
    )
}

export default GameCardDetailed