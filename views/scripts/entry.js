// fill in entry & exit time
function quickExit() {
    var dateNow = new Date();
    const dateExit = document.querySelector("#date-exit");
    dateExit.value = dateNow.toISOString().split('T')[0];
    const timeExit = document.querySelector('#time-exit');
    timeExit.value = dateNow.toISOString().substr(11, 8);
}
function quickEntry() {
    var dateNow = new Date();
    const dateEntry = document.querySelector("#date-entry");
    dateEntry.value = dateNow.toISOString().split('T')[0];
    const timeEntry = document.querySelector('#time-entry');
    timeEntry.value = dateNow.toISOString().substr(11, 8);
}
function entrySubmit() {
    const dateEntry = document.querySelector("#date-entry");
    const timeEntry = document.querySelector('#time-entry');
    const fromWhere = document.querySelector('#fromWhere');
    var entryTable = document.querySelector("#entryTable");
    entryTable.innerHTML += "<tr>" + "<td>" + "Entry" + "</td>" + "<td>" + fromWhere.value + "</td>" + "<td>"
        + dateEntry.value + " " + timeEntry.value + "</td>";
}
function exitSubmit() {
    const dateExit = document.querySelector("#date-exit");
    const timeExit = document.querySelector('#time-exit');
    var entryTable = document.querySelector("#entryTable");
    entryTable.innerHTML += "<tr>" + "<td>" + "Exit" + "</td>" + "<td>" + "" + "</td>" + "<td>"
        + dateExit.value + " " + timeExit.value + "</td>";
}
// display data from database
async function displayEntry() {
    const username = sessionStorage.getItem('username');
    const query = `query {
        Entry(username: "${username}")
        {
            Datetime
            type
            fromwhere
            residence
            placesPassed
        }
    }`;
    const data = await graphQLFetch(query, { username });
    console.log(data);
    var entryTable = document.querySelector("#entryTable");
    for (let item of data.Entry) {
        // entry
        if (item.type == 0) {
            entryTable.innerHTML += "<tr>" + "<td>" + "Exit" + "</td>" + "<td>" + "" + "</td>" + "<td>"
                + item.Datetime + "</td>";
            
        }
        // exit
        else {
            entryTable.innerHTML += "<tr>" + "<td>" + "Entry" + "</td>" + "<td>" + item.fromwhere + "</td>" + "<td>"
                + item.Datetime + "</td>";
        }
    }
}
window.addEventListener('load', (event => { displayEntry(); }))
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