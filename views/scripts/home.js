function getHealth() {
    if (sessionStorage.getItem("status") != null) {
        document.getElementById("status").innerText = sessionStorage.getItem("status");
        document.getElementById("temperature").innerText = sessionStorage.getItem("temperature");
    }
    else {
        const username = sessionStorage.getItem('username');
        console.log(username);
        getHealthFromDB(username);
    }
}
async function getHealthFromDB(username) {
    const query = `query {
        Health(username: "${username}")
        {
            temperature
            status
        }
    }`;
    const data = await graphQLFetch(query, {username});
    const health = data.Health;
    await sessionStorage.setItem("status", health.status);
    await sessionStorage.setItem("temperature", health.temperature);
    document.getElementById("status").innerText = health.status;
    document.getElementById("temperature").innerText = health.temperature;
}

window.addEventListener('load', (event => { getHealth(); }))
///////////////////////////////////////////////////////////////
async function graphQLFetch(query, variables = {}) {
    console.log("graphQlFetch!!!!");
    console.log("variables= " + JSON.stringify(variables));
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        console.log("body= " + body);

        const result = JSON.parse(body
        // , jsonDateReviver
        );

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;

    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

// function jsonDateReviver(key, value) {
//     if (dateRegex.test(value)) return new Date(value);
//     return value;
// }