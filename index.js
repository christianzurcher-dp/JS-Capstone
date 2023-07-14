const email = "";
const pass = "";
const people = [];
const baseChance = [];
const chance = [];
let resObject;
const userData = {
  email: email,
  password: pass,
};

async function auth() {
  try {
    const res = await fetch("https://api.devpipeline.org/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resObject = await res.json();
    const authToken = resObject.auth_info.auth_token;
    return authToken;
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function getAll() {
  try {
    const getAuth = await auth();
    const res = await fetch("https://api.devpipeline.org/users", {
      headers: { auth_token: getAuth },
    });
    const allUsers = await res.json();
    resObject = allUsers;
  } catch (error) {
    console.error("Error: ", error);
  }
  for (let i = 0; i < resObject.users.length; i++) {
    people.push({
      first_name: resObject.users[i].first_name,
      last_name: resObject.users[i].last_name,
      count: 1,
    });
    let element = document.createElement("div");
    element.className = "option-container";
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    let text = document.createElement("p");
    text.textContent = `${people[i].first_name} ${people[i].last_name}: ${people[i].count}`;
    text.id = `${people[i].first_name} ${people[i].last_name}`;
    let subtract = document.createElement("button");
    subtract.textContent = "-";
    subtract.style.backgroundColor = "pink";
    subtract.addEventListener("click", () => {
      subtraction(`${people[i].first_name} ${people[i].last_name}`);
    });
    let add = document.createElement("button");
    add.textContent = "+";
    add.style.backgroundColor = "lightgreen";
    add.addEventListener("click", () => {
      addition(`${people[i].first_name} ${people[i].last_name}`);
    });
    buttonContainer.appendChild(subtract);
    buttonContainer.appendChild(add);
    element.appendChild(text);
    element.appendChild(buttonContainer);
    sideBar.appendChild(element);

    baseChance.push(`${people[i].first_name} ${people[i].last_name}`);
    chance.push(`${people[i].first_name} ${people[i].last_name}`);
  }
}

function subtraction(name) {
  if (people[baseChance.indexOf(name)].count === 0) {
    alert("Hey you can't go below 0!!");
    return;
  }
  people[baseChance.indexOf(name)].count -= 1;
  let element = document.getElementById(name);
  element.textContent = `${name}: ${people[baseChance.indexOf(name)].count}`;
  chance.splice(chance.indexOf(name), 1);
}

function addition(name) {
  people[baseChance.indexOf(name)].count += 1;
  let element = document.getElementById(name);
  element.textContent = `${name}: ${people[baseChance.indexOf(name)].count}`;
  chance.push(name);
}

randomize.addEventListener("click", () => {
  if (chance.length === 0) {
    nameText.textContent = "You've gone through all the names";
    return;
  }
  index = Math.floor(Math.random() * chance.length);
  nameText.textContent = chance[index];
  people[baseChance.indexOf(chance[index])].count -= 1;
  let element = document.getElementById(chance[index]);
  element.textContent = `${chance[index]}: ${
    people[baseChance.indexOf(chance[index])].count
  }`;
  chance.splice(index, 1);
});

reset.addEventListener("click", () => {
  location.reload();
});

getAll();
