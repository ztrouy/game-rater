import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { createReview } from "../../managers/reviewManager"

const ReviewForm = () => {
    const [review, setReview] = useState()
    const { gameId } = useParams()
    const navigate = useNavigate()

    const initialReview = {
        gameId: gameId,
        content: ""
    }

    useEffect(() => {
        setReview(initialReview)
    }, [gameId])

    const handleSave = (event) => {
        event.preventDefault()
        createReview(review).then(res => {
            if (res.status === 201) {
                navigate(`/games/${gameId}`)
            } else {
                console.log(res.errors)
            }
        })
    }

    if (!review) return (<Spinner/>)

    return (
        <Form onSubmit={handleSave}>
            <FormGroup>
                <Label>Review</Label>
                <Input
                    type="text"
                    value={review.content}
                    onChange={event => setReview({...review, content: event.target.value})}
                    required
                    autoFocus
                />
            </FormGroup>
            <FormGroup className="d-flex flex-row-reverse gap-2">
                <Button color="success" type="submit">Save</Button>
                <Button onClick={() => navigate(`/games/${gameId}`)}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}

export default ReviewForm