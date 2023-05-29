import client from "./client"

export const createUser = async (userInfo) => {
    try {
        const { data } = await client.post("/users/register", userInfo)
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const verifyEmail = async (userInfo) => {
    try {
        const { data } = await client.post("/users/verify-email", userInfo)
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}