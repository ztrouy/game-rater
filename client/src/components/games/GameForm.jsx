import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { createGame, getSingleGame } from "../../managers/gameManager"
import { getCategories } from "../../managers/categoryManager"

const GameForm = () => {    
    const [game, setGame] = useState()
    const [categories, setCategories] = useState([])
    const { gameId } = useParams()
    const navigate = useNavigate()
    const initialGame = {
        title: "",
        designer: "",
        description: "",
        numberOfPlayers: 1,
        estimatedTimeToPlay: 30,
        ageRecommendation: 12,
        yearReleased: new Date().getFullYear(),
        categories: [0]
    }

    useEffect(() => {
        getCategories().then(setCategories)

        if (gameId) {
            getSingleGame(gameId).then(gameObj => {
                gameObj.categories = gameObj.categories.map(c => c.id)
                setGame(gameObj)
            })
        } else {
            setGame(initialGame)
        }
    }, [gameId])

    const handleSave = (event) => {
        event.preventDefault()
        if (game.categories.includes(0)) {
            window.alert("Choose a category!")
        }
        
        if (gameId) {
            console.log("Not implemented!")
        } else {
            createGame(game).then(res => {
                if (res.status === 201) {
                    navigate("/games")
                } else {
                    console.log(res.errors)
                }
            })
        }
    }

    const handleCancel = () => {
        if (gameId) {
            navigate(`/games/${gameId}`)
        } else {
            navigate("/games")
        }
    }

    if (!game || !categories) return (<Spinner/>)
    
    return (
        <Form onSubmit={handleSave}>
            <FormGroup>
                <Label>Title</Label>
                <Input
                    type="text"
                    value={game.title}
                    onChange={event => setGame({...game, title: event.target.value})}
                    required
                    maxLength={255}
                />
            </FormGroup>
            <FormGroup>
                <Label>Designer</Label>
                <Input
                    type="text"
                    value={game.designer}
                    onChange={event => setGame({...game, designer: event.target.value})}
                    required
                    maxLength={255}
                />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <Input
                    type="text"
                    value={game.description}
                    onChange={event => setGame({...game, description: event.target.value})}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Max Number Of Players</Label>
                <Input
                    type="number"
                    value={game.numberOfPlayers}
                    onChange={event => setGame({...game, numberOfPlayers: parseInt(event.target.value)})}
                    required
                    min={1}
                />
            </FormGroup>
            <FormGroup>
                <Label>Estimated Time To Play (Minutes)</Label>
                <Input
                    type="number"
                    value={game.estimatedTimeToPlay}
                    onChange={event => setGame({...game, estimatedTimeToPlay: parseInt(event.target.value)})}
                    required
                    min={1}
                />
            </FormGroup>
            <FormGroup>
                <Label>Age Recommendation</Label>
                <Input
                    type="number"
                    value={game.ageRecommendation}
                    onChange={event => setGame({...game, ageRecommendation: parseInt(event.target.value)})}
                    required
                    min={0}
                />
            </FormGroup>
            <FormGroup>
                <Label>YearReleased</Label>
                <Input
                    type="number"
                    value={game.yearReleased}
                    onChange={event => setGame({...game, yearReleased: parseInt(event.target.value)})}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Categories</Label>
                <Input
                    type="select"
                    value={game.categories[0]}
                    onChange={event => setGame({...game, categories: [parseInt(event.target.value)]})}
                    required
                >
                    <option value={0} key={"c-0"} disabled>Choose Category</option>
                    {categories.map(c => (
                        <option value={c.id} key={`c-${c.id}`}>{c.name}</option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup className="d-flex flex-row-reverse gap-2">
                <Button color="success" type="submit">Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}

export default GameForm