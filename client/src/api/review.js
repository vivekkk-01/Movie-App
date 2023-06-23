import client from "./client"

export const addReview = async (mediaId, reviewData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post("/reviews/" + mediaId, reviewData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const getReviews = async (mediaId) => {
    try {
        const { data } = await client.get(`/reviews/get-reviews-by-movie/${mediaId}`)
        return { type: "success", response: data }
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const deleteReview = async (reviewId) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.delete(`/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return { type: "success", response: data }
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const updateReview = async (reviewId, reviewData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.put(`/reviews/${reviewId}`, reviewData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return { type: "success", response: data }
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}
