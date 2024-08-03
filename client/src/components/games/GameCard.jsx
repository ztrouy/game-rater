import { Badge, Card, CardText, CardTitle } from "reactstrap"

const GameCard = ({ game }) => {
    return (
        <Card className="p-3">
            <CardTitle className="h5">{game.title}</CardTitle>
            <div className="d-flex flex-row gap-2">
                {game.categories.map(c => (
                    <Badge pill>{c.name}</Badge>
                ))}
            </div>
            <CardText>{game.description}</CardText>
        </Card>
    )
}

export default GameCard