//etch('https://reqres.in/api/users?page=1')
let allUsers = null
const fetchUsers = async () => {
  try {
    const userData = await fetch(' http://localhost:4400/users');
    const users = await userData.json();
    allUsers = await users;
  }
  catch (err) {
    console.log("Error fetching user", err)
  }
}


const fetchUserData = async (idToUser) => {
  const fetchUser = await fetch(` http://localhost:4400/users/${idToUser}`);
  return await fetchUser.json();


}
const showInfoUser = async (user) => {
  const container = document.createElement("div");
  app.appendChild(container)
  container.classList.add("container");
  const imgContainer = document.createElement("div");
  const avatar = document.createElement("img");
  avatar.setAttribute("src", user.avatar);
  imgContainer.appendChild(avatar);

  container.classList.add("img-container");
  const infoContainer = document.createElement("div");
  const name = document.createElement("p");
  name.textContent = `name : ${user.name}`;
  infoContainer.appendChild(name);

  const userName = document.createElement("p");
  userName.textContent = `username : ${user.username}`;
  infoContainer.appendChild(userName);

  const email = document.createElement("p");
  email.textContent = `email : ${user.email}`;
  infoContainer.appendChild(email);

  const address = document.createElement("p");
  address.textContent = `address : ${user.address.city}`;
  infoContainer.appendChild(address);

  const phone = document.createElement("p");
  phone.textContent = `phone : ${user.phone}`;
  infoContainer.appendChild(phone);

  const website = document.createElement("p");
  website.textContent = `website : ${user.website}`;
  infoContainer.appendChild(website);

  const company = document.createElement("p");
  company.textContent = `company : ${user.company.name}`;
  infoContainer.appendChild(company);

  const button = document.createElement("button");
  button.textContent = `home`;
  infoContainer.appendChild(button);
  button.addEventListener('click', async (event) => {

    app.removeChild(container);
    creatCard();
  })



  container.classList.add("info-container");
  container.appendChild(imgContainer);
  container.appendChild(infoContainer);

}
const creatCard = async () => {
  const app = document.querySelector("#app")
  const parent = document.createElement("div");
  parent.classList.add("card-container");
  app.appendChild(parent)

  await fetchUsers();
  //console.log(allUsers)
  for (let i = 0; i < allUsers.length; i++) {
    const card = document.createElement("div");
    const avatar = document.createElement("img");
    const fullName = document.createElement("p");
    const email = document.createElement("p");
    avatar.setAttribute("src", allUsers[i].avatar);
    fullName.textContent = `${allUsers[i].username}`;
    email.textContent = `${allUsers[i].email}`;
    card.addEventListener('click', async (event) => {

      app.removeChild(parent);
      const detailUser = await fetchUserData((event.target.id));
      showInfoUser(detailUser)

    })

    card.classList.add("card");
    card.id = allUsers[i].id;
    card.appendChild(avatar);
    card.appendChild(fullName);
    card.appendChild(email);
    parent.appendChild(card)

  }

}
creatCard()
