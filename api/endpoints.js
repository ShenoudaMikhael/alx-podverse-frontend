import Cookies from "js-cookie";

const domain = "http://localhost:3001";
const loginEndpoint = `${domain}/auth/login`;
const registerEndpoint = `${domain}/auth/register`;
const followersEndpoint = `${domain}/user/followers`;
const followingEndpoint = `${domain}/user/following`;

const token = Cookies.get("token");

class API {

    async login(email, password) {
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

        return response.json();
    }
}

export default API