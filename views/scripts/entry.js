// fill in entry & exit time
function quickExit() {
  var dateNow = new Date();
  const dateExit = document.querySelector("#date-exit");
  dateExit.value = dateNow.toISOString().split('T')[0];
  const timeExit = document.querySelector('#time-exit');
  timeExit.value = dateNow.toISOString().substr(11, 6) + "00";
}

function quickEntry() {
  var dateNow = new Date();
  const dateEntry = document.querySelector("#date-entry");
  dateEntry.value = dateNow.toISOString().split('T')[0];
  const timeEntry = document.querySelector('#time-entry');
  timeEntry.value = dateNow.toISOString().substr(11, 6) + "00";
}

function handleTime(date, time) {
  const date1 = date.split('-');
  const time1 = time.split(':');
  return date1[0] + date1[1] + date1[2] + time1[0] + time1[1];
}

async function entrySubmit() {
  const dateEntry = document.querySelector("#date-entry");
  const timeEntry = document.querySelector('#time-entry');
  const fromWhere = document.querySelector('#fromWhere');
  const entry = {
    username: `${sessionStorage.getItem('username')}`,
    Datetime: handleTime(dateEntry.value, timeEntry.value),
    type: 1,
    fromwhere: fromWhere.value,
    residence: document.getElementById('residence').innerText,
    placesPassed: document.getElementById('route').innerText
  };
  const query = `mutation EntryAdd($entry: EntryInput!){
        EntryAdd(entry: $entry)
        {
            Datetime
            fromwhere
        }
    }`;
  const data = await graphQLFetch(query, {
    entry
  });
  var entryTable = document.querySelector("#entryTable");
  entryTable.innerHTML += "<tr>" + "<td>" + "Entry" + "</td>" + "<td>" + data.EntryAdd.fromwhere + "</td>" + "<td>" + data.EntryAdd.Datetime + "</td>";
}

async function exitSubmit() {
  const dateExit = document.querySelector("#date-exit");
  const timeExit = document.querySelector('#time-exit');
  const entry = {
    username: `${sessionStorage.getItem('username')}`,
    Datetime: handleTime(dateExit.value, timeExit.value),
    type: 0
  }; // console.log(entry.Datetime);

  const query = `mutation EntryAdd($entry: EntryInput!){
        EntryAdd(entry: $entry)
        {
            Datetime
        }
    }`;
  const data = await graphQLFetch(query, {
    entry
  });
  console.log(data);
  var entryTable = document.querySelector("#entryTable");
  entryTable.innerHTML += "<tr>" + "<td>" + "Exit" + "</td>" + "<td>" + "" + "</td>" + "<td>" + data.EntryAdd.Datetime + "</td>";
} // display data from database


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
  const data = await graphQLFetch(query, {
    username
  });
  console.log(data);
  var entryTable = document.querySelector("#entryTable");

  for (let item of data.Entry) {
    // exit
    if (item.type == 0) {
      entryTable.innerHTML += "<tr>" + "<td>" + "Exit" + "</td>" + "<td>" + "" + "</td>" + "<td>" + item.Datetime + "</td>";
    } // entry
    else {
      entryTable.innerHTML += "<tr>" + "<td>" + "Entry" + "</td>" + "<td>" + item.fromwhere + "</td>" + "<td>" + item.Datetime + "</td>";
    }
  }
}

window.addEventListener('load', event => {
  displayEntry();
}); ///////////////////////////////////////////////////////////////

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
} // function jsonDateReviver(key, value) {
//     if (dateRegex.test(value)) return new Date(value);
//     return value;
// }