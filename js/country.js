document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    fetch(`http://localhost:3000/countries/${id}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("country-name").textContent = data.name;
        document.getElementById("flag").src = `../media/images/flags/${data.flag}`;
        document.getElementById("flag").alt = data.name;
  
        document.getElementById("gold").textContent = data.medals.gold;
        document.getElementById("silver").textContent = data.medals.silver;
        document.getElementById("bronze").textContent = data.medals.bronze;
  
        const total = data.medals.gold + data.medals.silver + data.medals.bronze;
        document.getElementById("total").textContent = total;
      });
  });
  
  function goToMedals(type) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    window.location.href = `discipline-medals.html?country=${id}&type=${type}`;
  }
  