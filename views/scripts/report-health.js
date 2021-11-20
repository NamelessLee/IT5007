async function handleHealthSubmit() {
    // save if positive with COVID
    const covid = 0;
    if (document.getElementById('covid').checked) covid = 1;
    let array = ['fever', 'cough', 'sneeze', 'headache', 'dizzy', 'breath', 'chest'];
    let symptoms = [];
    for (let item of array) {
      if (document.getElementById(item).checked) symptoms.push(item);
    }
    const health = {
      username: sessionStorage.getItem('username'),
      temperature: document.getElementById('temperature').innerText,
      covid: covid,
      symptoms: symptoms
    };
    const query = `mutation {
              HealthAdd(health: ${health})
              {
                  temperature
                  status
              }
          }`;
    const data = await graphQLFetch(query, { health });
    const health = data.Health;
    await sessionStorage.setItem("status", health.status);
    await sessionStorage.setItem("temperature", health.temperature);
  }