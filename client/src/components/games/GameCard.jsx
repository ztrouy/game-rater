import { Badge, Card, CardText, CardTitle } from "reactstrap"

const GameCard = ({ game }) => {
    return (
        <Card className="p-3">
            <CardTitle className="h5 mb-0">{game.title}</CardTitle>
            <CardText className="mb-1 mt-0">{game.designer}</CardText>
            <div className="d-flex flex-row gap-2">
                {game.categories.map(c => (
                    <Badge pill>{c.name}</Badge>
                ))}
            </div>
            <CardText className="mt-2">{game.description}</CardText>
        </Card>
    )
}

export default GameCard