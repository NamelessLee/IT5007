const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

async function handleLoginSubmit() {
  var form = document.getElementById("loginForm");
  var inputElements = form.getElementsByTagName("input");
  var user = {
    username: inputElements[0].value,
    password: inputElements[1].value
  };
  console.log("user= " + JSON.stringify(user));
  var userInDb = await findUser(user);
  console.log("userInDb=" + JSON.stringify(userInDb));
  var pwd = userInDb.password;

  if (pwd == user.password) {
    //successful on login
    sessionStorage.setItem('name', userInDb.name); //当前登录用户存进session    

    sessionStorage.setItem('username', userInDb.username);
    sessionStorage.setItem('type', userInDb.type);
    alert("successful on login"); //提示成功

    window.location.href = '/home'; //跳转回主页

    document.getElementById("currentUser").innerText = userInDb.name; //主页currentUser显示登入用户的名字
  } else {
    alert("Failed. Wrong username or password");
  }
}

async function findUser(user) {
  const query = `query {
        User(user:{
          username:"${user.username}",
          password:"${user.password}",
        }){
          username
          password
          name
          type
        }
      }`;
  const data = await graphQLFetch(query, {
    user
  });
  console.log("data= " + JSON.stringify(data));
  return data.User[0];
} 


window.addEventListener('load', sessionStorage.clear());





///////////////////////////////////////////////////////////////


async function graphQLFetch(query, variables = {}) {
  console.log("graphQlFetch!!!!");

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
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}