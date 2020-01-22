// POST Request Access-Token
const request = async () => {

    const client_id = "97436deef1ac414495be09ca5d67c3dc"; // Your client id
    const client_secret = "98f9d13a1b374c96bcfd322c29915b40"; // Your secret
    const secret = window.btoa(
        "97436deef1ac414495be09ca5d67c3dc:98f9d13a1b374c96bcfd322c29915b40"
    );

    try {
        const getToken = await fetch("https://accounts.spotify.com/api/token", {
            // Get Access Token
            method: "POST",
            headers: {
                Authorization: "Basic " + secret,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        });

        const response = await getToken.json();
        sessionStorage.setItem("refresh", response.access_token)

        console.log("sec:")

    } catch (error) {
        console.error(error)
    }
};

export default request;