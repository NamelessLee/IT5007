document.getElementById("healthSubmit").addEventListener("click", handleHealthSubmit);
async function handleHealthSubmit() {
    // save if positive with COVID
    const covid = 0;
    if (document.getElementById('covid').checked) covid = 1;
    let array = ['fever', 'cough', 'sneeze', 'headache', 'dizzy', 'breath', 'chest'];
    let symptoms = [];
    for (let item of array) {
        if (document.getElementById(item).checked) symptoms.push(item);
    }
    const username = sessionStorage.getItem('username');
    const temperature = document.getElementById('temperature').value;
    const health = {
        username: username,
        temperature: temperature,
        covid: covid,
        symptoms: symptoms,
    };
    const query = `mutation HealthAdd($health: HealthInput!){
              HealthAdd(health: $health)
              {
                  temperature
                  status
              }
          }`;
    const data = await graphQLFetch(query, { health });
    sessionStorage.setItem("status", data.HealthAdd.status);
    sessionStorage.setItem("temperature", data.HealthAdd.temperature);
}

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