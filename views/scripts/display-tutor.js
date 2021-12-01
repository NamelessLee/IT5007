console.log("starts at " + performance.now());
const url = window.location.href;
const arr = url.split("/");
const username = arr[arr.length - 1];
let tutor;
let reviews;
async function loadData() {
    const query = `query {
        FindTutor(username: "${username}") {
            username
            name
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
    if (data) {
        tutor = data.FindTutor;
        reviews = data.Reviews;
        document.getElementById('username').innerText = tutor.name;
        document.getElementById('degree').innerText = tutor.degree;
        document.getElementById('price0').innerText = tutor.price[0];
        document.getElementById('price1').innerText = tutor.price[1];
        document.getElementById('intro').innerText = tutor.intro;
        document.getElementById('numReviews').innerText = tutor.numReviews;
        // courses
        const courses = tutor.courses;
        const wrapCourses = document.getElementById('wrapCourses');
        wrapCourses.innerHTML = "";
        for (let course of courses) {
            wrapCourses.innerHTML += `<button type="button" class="btn btn-primary btn-lg mr-3 ml-3">${course}</button>`;
        }
        // reviews
        const wrapReviews = document.getElementById('wrapReviews');
        wrapReviews.innerHTML = "";
        for (let review of reviews) {
            wrapReviews.innerHTML += `
            <div class="row border-bottom py-1">
            <div class="stars">
              <span id="star1" class="fa fa-star checked"></span>
              <span id="star2" class="fa fa-star checked"></span>
              <span id="star3" class="fa fa-star checked"></span>
              <span id="star4" class="fa fa-star checked"></span>
              <span id="star5" class="fa fa-star checked"></span>
            </div>
            <div>
            <div class="d-flex justify-content-between">
            <div><strong>${review.studentName}</strong> <span class="text-muted">Student from NUS</span></div>
            <div class="fst-italic">${review.date}</div>
          </div>
          <div>
            ${review.content}
          </div>
            </div>
          </div>`
            ;
        }
    }
}


window.addEventListener('load', loadData());
//-----------------------------------------------------
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
console.log("ends at " + performance.now());