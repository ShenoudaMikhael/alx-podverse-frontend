import Cookies from "js-cookie";

const domain = "http://localhost:3000";
const loginEndpoint = `${domain}/auth/login`;
const registerEndpoint = `${domain}/auth/register`;
const isLoggedInEndpoint = `${domain}/auth/isLoggedIn`;
const followersEndpoint = `${domain}/user/followers`;
const followingEndpoint = `${domain}/user/following`;
const createPodcastEndpoint = `${domain}/podcast/create`;
const getPodcastEndpoint = `${domain}/podcast`;

const token = Cookies.get("token");

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
}

export default API