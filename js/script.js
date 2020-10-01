let allUsers = [];
let input = document.querySelector("#input");
let button = document.querySelector("#searchButton");

input.addEventListener("input", () => {
  return (button.disabled = false);
});

window.addEventListener("load", () => {
  tabUsers = document.querySelector("#users");
  tabInformation = document.querySelector("#information");
  input = document.querySelector("#input");

  tabUsers.textContent = "No users to show...";
  tabInformation.textContent = "No information to show...";
  button.disabled = true;

  fetchUsers();
  focus();
  renderUsers();
});

async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();

  allUsers = json.results
    .map((user) => {
      const { name, dob, gender, picture } = user;

      return {
        name: name.first + " " + name.last,
        age: dob.age,
        gender: gender,
        picture: picture.medium,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
}

function focus() {
  document.querySelector("#input").focus();
}

button.addEventListener("click", () => {
  let text = input.value.toLowerCase();
  let filteredUsers = [];

  if (input.value === "" || input.value !== filteredUsers.name) {
    tabUsers.textContent = "No users to show...";
    tabInformation.textContent = "No information to show...";
    button.disabled = true;
  }

  if (input.value !== "") {
    for (let index = 0; index < allUsers.length; index++) {
      let x = allUsers[index].name.toLowerCase();
      if (x.includes(text) === true) {
        filteredUsers.push(allUsers[index]);
      }
    }
    let maleUsers = 0;
    let femaleUsers = 0;
    let allAges = 0;

    let usersHTML = "<div>";

    filteredUsers.forEach((user) => {
      const { name, age, gender, picture } = user;

      const userHTML = `
        <div>
          <img src="${picture}" alt="${name}" class="picture">
        </div>
        <div>
          <p>${name}, ${age} anos</p>
        </div>
      `;
      usersHTML += userHTML;

      if (gender === "male") {
        maleUsers++;
      } else {
        femaleUsers++;
      }

      if (age !== 0) {
        allAges += age;
      }

      let foundUsers = maleUsers + femaleUsers;
      let averageAge = (allAges / foundUsers).toFixed(2);

      let filteredInformation = "<div>";

      const data = `
          <div>
            <h3>${foundUsers} users found</h3>
          </div>
          <div>
            <p>Male: ${maleUsers}</p>
          </div>
          <div>
            <p>Female: ${femaleUsers}</p>
          </div>
          <div>
            <p>Age of All Searched Users: ${allAges}</p>
          </div>
          <div>
            <p>Average Age: ${averageAge}</p>
          </div>
          </div>`;

      filteredInformation += data;

      tabUsers.innerHTML = usersHTML;
      tabInformation.innerHTML = filteredInformation;
    });
    input.focus();
  }
});
