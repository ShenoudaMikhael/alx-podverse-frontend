import Cookies from "js-cookie";

const domain = "http://localhost:3000";
const loginEndpoint = `${domain}/auth/login`;
const registerEndpoint = `${domain}/auth/register`;
const isLoggedInEndpoint = `${domain}/auth/isLoggedIn`;
const userEndpoint = `${domain}/user/profile`;
const followersEndpoint = `${domain}/user/followers`;
const followingEndpoint = `${domain}/user/following`;
const createPodcastEndpoint = `${domain}/podcast/create`;


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
                "Content-Type": "application/json",
                'x-auth-token': token

            },
            body: JSON.stringify({ ...data }),
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
}

export default API