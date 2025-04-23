document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const disciplineName = params.get("discipline");
  
    const disciplineTitle = document.getElementById("discipline-name");
    const disciplineImage = document.getElementById("image");
    const medalsTableBody = document.getElementById("medals-body");
  
    if (!disciplineName) {
      disciplineTitle.textContent = "Discipline not selected";
      return;
    }
  
    fetch("http://localhost:3000/countries")
      .then(res => res.json())
      .then(countries => {
        const results = [];
        let disciplineImageSrc = null;
  
        countries.forEach(country => {
          const discipline = country.disciplines.find(d => d.name.toLowerCase() === disciplineName.toLowerCase());
          
          if (discipline) {
            if (!disciplineImageSrc) disciplineImageSrc = discipline.image;
            
            const total = discipline.gold + discipline.silver + discipline.bronze;
            results.push({
              country: country.name, 
              total: total
            });
          }
        });
  
        if (results.length > 0) {
          disciplineTitle.textContent = disciplineName;
          disciplineImage.src = `../media/images/disciplines/${disciplineImageSrc}`;
          disciplineImage.alt = disciplineName;
  
          results.forEach(item => {
  const row = document.createElement("tr");

  const tdCountry = document.createElement("td");
  const countryLink = document.createElement("a");
  countryLink.textContent = item.country;
  countryLink.href = `country-discipline.html?country=${encodeURIComponent(item.country)}&discipline=${encodeURIComponent(disciplineName)}`;
  countryLink.style.color = "white";
  countryLink.style.textDecoration = "none";
  
  tdCountry.appendChild(countryLink);

  const tdTotal = document.createElement("td");
  tdTotal.textContent = item.total;

  row.appendChild(tdCountry);
  row.appendChild(tdTotal);
  medalsTableBody.appendChild(row);
          });
        } else {
          disciplineTitle.textContent = "No countries found for this discipline.";
        }
      })
      .catch(err => {
        console.error("Қате:", err);
        disciplineTitle.textContent = "Қате орын алды!";
      });
  });
  