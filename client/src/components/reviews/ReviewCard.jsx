import { Card, CardBody, CardHeader, CardText } from "reactstrap"

const ReviewCard = ({ review }) => {
    return (
        <Card color="light" outline className="shadow">
            <CardHeader>{review.user.firstName} {review.user.lastName}</CardHeader>
            <CardBody>
                <CardText>{review.content}</CardText>
            </CardBody>
        </Card>
    )
}

export default ReviewCard