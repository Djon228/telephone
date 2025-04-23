document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/countries")
      .then(res => res.json())
      .then(countries => {
        const disciplineList = document.getElementById("discipline-list");
  
        const requiredDisciplines = [
          "Athletics",
          "Swimming",
          "Gymnastics",
          "Basketball",
          "Wrestling",
          "Weightlifting",
          "Diving",
          "Table Tennis"
        ];
  
        const uniqueDisciplines = new Map();
  
        countries.forEach(country => {
          country.disciplines.forEach(discipline => {
            if (requiredDisciplines.includes(discipline.name)) {
              
              if (!uniqueDisciplines.has(discipline.name)) {
                uniqueDisciplines.set(discipline.name, discipline);
              }
            }
          });
        });
  
        
        uniqueDisciplines.forEach(discipline => {
          const card = document.createElement("div");
          card.className = "discipline-card";
          card.onclick = () => {        
            const encodedName = encodeURIComponent(discipline.name);
            window.location.href = `discipline-country.html?discipline=${encodedName}`;
          };
          
  
          card.innerHTML = `
            <img src="../media/images/disciplines/${discipline.image}" alt="${discipline.name}" />
            <div class="discipline-name">${discipline.name}</div>
          `;
  
          disciplineList.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Қате:", err);
      });
  });
  