var courses = [];

function handleAddCourse() {
  var course = document.getElementById("course").value;
  courses.push(course);
  document.getElementById("course").value = '';
  document.getElementById("courses").innerText = JSON.stringify(courses);
}

function handleClearCourse() {
  courses = [];
  document.getElementById("course").value = '';
  document.getElementById("courses").innerText = courses;
}

async function handleSignUp() {
  var username = document.getElementById("id").value;
  var password = document.getElementById("password").value;
  var cfmpassword = document.getElementById("confirmPassword").value;
  var dorm = document.getElementById("dorm").value;
  var name = document.getElementById("name").value;
  var type = [];

  if (document.getElementById("stu").checked == true) {
    type.push("student");
  } else if (document.getElementById("stf").checked == true) {
    type.push("staff");
  } else if (document.getElementById("ext").checked == true) {
    type.push("ext");
  }

  if (!(username && name && password && cfmpassword && dorm && courses)) {
    alert("Failed. Please complete the form.");
  } else if (password != cfmpassword) {
    alert("Failed. Password and confirmPassword are not the same.");
  } else {
    const user = {
      username: `${username}`,
      password: `${password}`,
      name: `${name}`,
      type: `${type}`,
      dorm: `${dorm}`,
      dorm: `${courses}`
    }; // console.log(entry.Datetime);

    const query = `mutation UserAdd($user: NewUserInput){
            UserAdd(user: $user)
            {
                username
            }
        }`;
    const data = await graphQLFetch(query, {
      user
    });
    console.log("data= " + JSON.stringify(data));

    if (data.UserAdd == null || data.UserAdd[0].username == null) {
      alert("Username already exists");
    } else {
      alert("Successful on Sign Up.");
      window.location.href = '/login';
    }
  }
}