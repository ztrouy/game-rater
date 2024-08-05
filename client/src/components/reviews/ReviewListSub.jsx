import ReviewCard from "./ReviewCard"

const ReviewListSub = ({ reviews }) => {
    return (
        <div className="d-flex flex-column gap-3">
            {reviews.map(review => (
                <ReviewCard review={review} key={`r-${review.id}`} />
            ))}
        </div>
    )
}

export default ReviewListSub