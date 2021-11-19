function handleLoginSubmit(){
    var form = document.getElementById("loginForm");
    var inputElements = form.getElementsByTagName("input");
    var user = {
        username: inputElements[0].value,
        password: inputElements[1].value
    }
    console.log("user= " + JSON.stringify(user));
    findUser(user);
}

async function findUser(user) {
    const query = `query users($username: String){ 
        User(username: $username) {
            username password
        }
    }`;
    var username = user.username;
    const data = await graphQLFetch(query, { username });
    console.log("data = " + data);
}

///////////////////////////////////////////////////////////////
async function graphQLFetch(query, variables = {}) {
    console.log("graphQlFetch!!!!");
    console.log("variables= " + JSON.stringify(variables));
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      console.log("body= "+ body);
/*
      const result = JSON.parse(body, jsonDateReviver);
  
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
      */
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }
