import Cookies from "js-cookie";

const domain = "http://localhost:3000";
const loginEndpoint = `${domain}/auth/login`;
const registerEndpoint = `${domain}/auth/register`;
const isLoggedInEndpoint = `${domain}/auth/isLoggedIn`;
const userEndpoint = `${domain}/user/profile`;
const updateUserEndpoint = `${domain}/user/updateProfile`;
const updatePasswordEndpoint = `${domain}/user/updatePassword`;
const userProfilePictureEndpoint = `${domain}/user/profilePicture`;
const userPodcastsEndpoint = `${domain}/podcast/userPodcast`;
const followersEndpoint = `${domain}/user/followers`;
const followingEndpoint = `${domain}/user/following`;
const createPodcastEndpoint = `${domain}/podcast/create`;
const getPodcastEndpoint = `${domain}/podcast`;
const getCategories = `${domain}/category/get`;


class API {

    static async login(email, password) {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        return response;
    }
    static async register(data) {
        const response = await fetch(registerEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data
            }),
        });

        return response;
    }
    static async isLoggedIn() {
        const token = Cookies.get("token");
        const response = await fetch(isLoggedInEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token

            },
            body: JSON.stringify({}),
        });

        return response;
    }


    static async createPodcast(data) {
        const token = Cookies.get("token");
        const response = await fetch(createPodcastEndpoint, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                'x-auth-token': token,

            },
            body: data,
        });

        return response;
    }
    static async postPodcast(uuid, socket_current_id) {
        const response = await fetch(`${getPodcastEndpoint}/${uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token

            },
            body: JSON.stringify({ socket_current_id })
        });

        return response;
    }

    static async getProfile() {
        const token = Cookies.get("token");
        const response = await fetch(userEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token

            },
        });

        return response;

    }

    static async updateProfile(data) {
        const token = Cookies.get("token");
        const response = await fetch(updateUserEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
            body: JSON.stringify({ ...data }),
        })

        return response;
    }

    static async updatePassword(oldPassword, newPassword) {
        const token = Cookies.get("token");
        const response = await fetch(updatePasswordEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        })

        return response;
    }

    static async updateProfilePicture(data) {
        const token = Cookies.get("token");
        const response = await fetch(userProfilePictureEndpoint, {
            method: "PUT",
            headers: {
                // "Content-Type": "multipart/form-data",
                'x-auth-token': token
            },
            body: data,
        })

        return response;
    }

    static async getCategories() {
        const token = Cookies.get("token");
        const response = await fetch(getCategories, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
        })

        return response
    }

    static async getFollowers() {
        const token = Cookies.get("token");
        const response = await fetch(followersEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
        })

        return response
    }

    static async getFollowing() {
        const token = Cookies.get("token");
        const response = await fetch(followingEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
        })

        return response
    }

    static async getUserPodcast() {
        const token = Cookies.get("token");
        const response = await fetch(userPodcastsEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': token
            },
        })

        return response
    }
}

export default API
export { domain }