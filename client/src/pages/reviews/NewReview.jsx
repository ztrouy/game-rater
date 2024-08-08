import ReviewForm from "../../components/reviews/ReviewForm"

const NewReview = () => {
    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <div className="w-75 mt-2">
                <h3>New Review</h3>
                <ReviewForm/>
            </div>
        </div>
    )
}

export default NewReview