import { Badge, Card, CardText, CardTitle, NavLink } from "reactstrap"
import { NavLink as RRNavLink } from "react-router-dom"

const GameCard = ({ game }) => {
    return (
        <Card className="p-3 shadow-sm" outline color="light">
            <NavLink tag={RRNavLink} to={`${game.id}`}>
                <CardTitle className="h5 mb-0">{game.title}</CardTitle>
            </NavLink>
            <CardText className="mb-1 mt-0">{game.designer}</CardText>
            <div className="d-flex flex-row gap-2">
                {game.categories.map(c => (
                    <Badge pill key={`game-${game.id}-cat-${c.id}`}>{c.name}</Badge>
                ))}
            </div>
            <CardText className="mt-2">{game.description}</CardText>
        </Card>
    )
}

export default GameCard