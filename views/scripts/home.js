console.log("starts at " + performance.now());
function getHealth() {
  console.log("fetching starts at " + performance.now());
  if (sessionStorage.getItem("status") != null) {
    let status = document.getElementById('status');
    let temperature = document.getElementById('temperature');
    status.innerText = sessionStorage.getItem("status");
    temperature.innerText = sessionStorage.getItem("temperature");
    changeColor(status);
  } else {
    const username = sessionStorage.getItem('username');
    console.log(username);
    getHealthFromDB(username);
  }
  console.log("fetching ends at " + performance.now());
}

function changeColor(status) {
  if (status.innerText == 'Yellow') status.style.backgroundColor = 'yellow';else if (status.innerText == 'Red') status.style.backgroundColor = 'red';else status.style.backgroundColor = 'green';
}

async function getHealthFromDB(username) {
  console.log("fetching from db starts at " + performance.now());
  const query = `query {
        Health(username: "${username}")
        {
            temperature
            status
        }
    }`;
  const data = await graphQLFetch(query, {
    username
  });
  const health = data.Health;
  sessionStorage.setItem("status", health.status);
  sessionStorage.setItem("temperature", health.temperature);
  let status = document.getElementById('status');
  status.innerText = health.status;
  document.getElementById("temperature").innerText = health.temperature;
  changeColor(status);
  console.log("fetching from db ends at " + performance.now());
}

window.addEventListener('load', event => {
  getHealth();
}); 

console.log("ends at " + performance.now());
console.log(performance.getEntries());
///////////////////////////////////////////////////////////////

async function graphQLFetch(query, variables = {}) {
  console.log("graphQlFetch!!!!");
  console.log("variables= " + JSON.stringify(variables));

  try {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    console.log("body= " + body);
    const result = JSON.parse(body // , jsonDateReviver
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