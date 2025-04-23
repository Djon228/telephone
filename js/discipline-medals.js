document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get("country");
    const type = params.get("type"); 
  
    const medalTitle = document.getElementById("medal-title");
    const countryNameEl = document.getElementById("country-name");
    const flagImg = document.getElementById("flag");
    const medalsBody = document.getElementById("medals-body");
  
    if (!countryId || !type) {
      medalTitle.textContent = "Invalid parameters";
      return;
    }
  
    fetch(`http://localhost:3000/countries/${countryId}`)
      .then(res => res.json())
      .then(data => {
        countryNameEl.textContent = data.name;
        flagImg.src = `../media/images/flags/${data.flag}`;
        flagImg.alt = data.name;
  
        medalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Medals`;
  
        const filtered = data.disciplines
          .filter(d => d[type] > 0)
          .map(d => ({
            name: d.name,
            count: d[type]
          }));
  
        filtered.forEach(item => {
          const row = document.createElement("tr");
  
          const tdDiscipline = document.createElement("td");
          tdDiscipline.textContent = item.name;
  
          const tdCount = document.createElement("td");
          tdCount.textContent = item.count;
  
          row.appendChild(tdDiscipline);
          row.appendChild(tdCount);
          medalsBody.appendChild(row);
        });
      })
      .catch(err => {
        console.error("Қате:", err);
        medalTitle.textContent = "Қате орын алды!";
      });
  });
  