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

    const result = JSON.parse(body);

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

async function execute() {
  const url = window.location.href;
  console.log(url);
  const array = url.split("/");
  const username = array[array.length - 1];
  const query = `query {
          FindTutor(username: "${username}") {
              username
              gender
              courseType
              courses
              price
              availability
              level
              degree
              completedLessons
              numReviews
              stars
              intro
          },
          Reviews(username: "${username}") {
              date
              tutorName
              studentName
              stars
              content
          }
        }`;
  
  const data = await graphQLFetch(query);
  console.log(data);
  const tutor = data.FindTutor;
  tutor.courses.map(course => {course});
}
execute();