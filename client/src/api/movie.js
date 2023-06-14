import client from "./client"

export const uploadTrailer = async (trailer, setProgress) => {
    const token = localStorage.getItem("auth-token")
    const formData = new FormData()
    formData.append("video", trailer)
    try {
        const { data } = await client.post("/movies/upload-trailer", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            onUploadProgress: ({ loaded, total }) => {
                setProgress(Math.floor((loaded / total) * 100))
            }
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}