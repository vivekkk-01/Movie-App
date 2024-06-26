import client from "./client";

export const createActor = async (actorData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post("/actors", actorData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const searchActor = async (query) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.get(`/actors/search?name=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const getActors = async (pageNo, limit) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.get(`/actors?pageNo=${pageNo}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const updateActor = async (id, actorData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.put("/actors/" + id, actorData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const deleteActor = async (id) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.delete("/actors/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}

export const getSingleActor = async (profileId) => {
    try {
        const { data } = await client.get("/actors/" + profileId)
        return { type: "success", response: data };
    } catch (error) {
        const err = error?.response?.data ? error?.response?.data : error?.message ? error?.message : error?.data ? error?.data : "Something went wrong, please try again"
        return { type: "error", response: err };
    }
}