document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("country");
    const disciplineName = params.get("discipline");
  
    const countryTitle = document.getElementById("country-name");
    const flagImg = document.getElementById("flag");
  
    const goldEl = document.getElementById("gold");
    const silverEl = document.getElementById("silver");
    const bronzeEl = document.getElementById("bronze");
    const totalEl = document.getElementById("total");
  
    if (!countryName || !disciplineName) {
      countryTitle.textContent = "Invalid parameters";
      return;
    }
  
    fetch("http://localhost:3000/countries")
      .then(res => res.json())
      .then(countries => {
        const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
        if (!country) {
          countryTitle.textContent = "Country not found";
          return;
        }
  
        const discipline = country.disciplines.find(d => d.name.toLowerCase() === disciplineName.toLowerCase());
        if (!discipline) {
          countryTitle.textContent = `No ${disciplineName} results for ${countryName}`;
          return;
        }
  
        countryTitle.textContent = country.name;
        flagImg.src = `../media/images/flags/${country.flag}`;
        flagImg.alt = `${country.name} flag`;
  
        goldEl.textContent = discipline.gold;
        silverEl.textContent = discipline.silver;
        bronzeEl.textContent = discipline.bronze;
        totalEl.textContent = discipline.gold + discipline.silver + discipline.bronze;
      })
      .catch(err => {
        console.error("Қате:", err);
        countryTitle.textContent = "Қате орын алды!";
      });
  });
  