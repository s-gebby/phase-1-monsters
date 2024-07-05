document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById("monster-container");
  const monsterForm = document.getElementById("monster-form");
  const backBtn = document.getElementById("back");
  const forwardBtn = document.getElementById("forward");

  let currentPage = 1;
  const limit = 50;

  const fetchMonsters = (page = 1) => {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
      .then((response) => response.json())
      .then((monsters) => {
        monsterContainer.innerHTML = "";
        monsters.forEach((monster) => {
          const monsterDiv = document.createElement("div");
          monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
        });
        toggleButtons(page);
      });
  };

  const createMonster = (name, age, description) => {
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, age, description }),
    })
      .then((response) => response.json())
      .then((newMonster) => {
        const monsterDiv = document.createElement("div");
        monsterDiv.innerHTML = `
        <h2>${newMonster.name}</h2>
        <p>Age: ${newMonster.age}</p>
        <p>Description: ${newMonster.description}</p>
      `;
        monsterContainer.appendChild(monsterDiv);
      });
  };

  const toggleButtons = (page) => {
    backBtn.style.display = page > 1 ? "inline-block" : "none";
  };

  monsterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const description = document.getElementById("description").value;
    createMonster(name, age, description);
  });

  forwardBtn.addEventListener("click", () => {
    currentPage++;
    fetchMonsters(currentPage);
  });

  backBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMonsters(currentPage);
    }
  });

  fetchMonsters();
});
