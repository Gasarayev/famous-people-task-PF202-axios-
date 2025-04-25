document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
  }

  let famous = [];

  
  function renderCards(data) {
    const cardArea = document.getElementById("cardsContainer");
    cardArea.innerHTML = ""; 

    data.forEach((person) => {
      const name = person.fullName;
      const age = person.age;
      const img = person.img;
      const city = person.city;
      const gender = person.gender;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${img}" alt="${name}">
        <h3>${name}</h3>
        <p>Yaş: ${age}</p>
        <p>Cinsiyyət: ${gender}</p>
        <p class="address">Adress: ${city}</p>
      `;


      card.addEventListener("click", () => {
        localStorage.setItem("selectedPerson", JSON.stringify(person));
        window.location.href = "person-details.html";
      });
  
      cardArea.appendChild(card);
    });
  }

  async function getFamousPerson() {
    try {
      const BASE_URL = "https://680a0ad71f1a52874cdee8c0.mockapi.io/persons";
      const response = await axios.get(BASE_URL);
      famous = response.data;
      renderCards(famous);
    } catch (error) {
      console.log("Datani getirmek mumkun olmadi", error);
    }
  }
  getFamousPerson();

// search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll("#cardsContainer .card");

    cards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(searchTerm) ? "block" : "none";
    });
  });

  // sort a to z, z to a
  let isAscending = true;
  const btnAtoZ = document.getElementById("btnA");
  btnAtoZ.addEventListener("click", () => {
    const cardArea = document.getElementById("cardsContainer");
    const cards = Array.from(cardArea.querySelectorAll(".card"));

    cards.sort((a, b) => {
      const nameA = a.querySelector("h3").textContent.toLowerCase();
      const nameB = b.querySelector("h3").textContent.toLowerCase();

      return isAscending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    cardArea.innerHTML = "";
    cards.forEach((card) => cardArea.appendChild(card));

    isAscending = !isAscending;
  });

  

  // age buttons 
  const underBtn = document.getElementById('under');
  const middleBtn = document.getElementById('middle');
  const overBtn = document.getElementById('over');
  const resetBtn = document.getElementById('reset');


  underBtn.addEventListener("click", () => {
    const under = famous.filter(person => person.age < 30);
    renderCards(under);
  });

  middleBtn.addEventListener("click", () => {
    const middle = famous.filter(person => person.age >= 30 && person.age <= 60);
    renderCards(middle);
  });

  overBtn.addEventListener("click", () => {
    const over = famous.filter(person => person.age > 60);
    renderCards(over);
  });


  // reset button
  resetBtn.addEventListener("click", () => {
    getFamousPerson();
  })
});
