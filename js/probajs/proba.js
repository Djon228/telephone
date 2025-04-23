document.addEventListene("DOMContentLoaded", () =>{
    fetch("http://Localhost:3000/countries")
    .then(res => res.json())
    .then(countries => {
        const list = document.getElementById('country-list');

        countries.forEach(country => {
            const card = document.createElement("div");
            card.className = "country-card";
            card.onclick = () =>{
                window.location.href = `country.html?id=${country.id}`;
            };
            card.innerHTML = `
            <img src="../media/images/flags/${country.flag}" alt="${country.name}">
            <div class="country-name">${country.name}</div>`

            list.appendChild(card);
        });
    })
        .catch(err => {
            console.log("Error" + err);
    });
})