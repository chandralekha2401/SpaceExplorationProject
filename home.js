document.addEventListener("DOMContentLoaded", () => {
    const exploreButton = document.querySelector(".space-explore");
    const resetButton = document.querySelector(".space-reset");
    const resultHeading = document.querySelector(".result-heading");
    const resultMass = document.querySelector(".result-mass");
    const resultGravity = document.querySelector(".result-gravity");
    const resultDensity = document.querySelector(".result-density");
    const errorMessage = document.querySelector(".error-message");

    
    exploreButton.addEventListener("click", () => {
        const selectedPlanet = document.querySelector("input[name='question-1']:checked");
        
        if (selectedPlanet) {
            showPlanetDescription(selectedPlanet.value);
        } else {
            errorMessage.textContent = "Please select a planet to explore!";
        }
    });
    
    resetButton.addEventListener("click", () => {
        window.location.reload();
    });
    
    function showPlanetDescription(planet) {
        fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planet.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.englishName) {
                resultHeading.textContent = data.englishName;
                resultMass.textContent = data.mass ? `Mass: ${data.mass.massValue} x 10^${data.mass.massExponent} kg` : "Mass: N/A";
                resultGravity.textContent = data.gravity ? `Gravity: ${data.gravity} m/s²` : "Gravity: N/A";
                resultDensity.textContent = data.density ? `Density: ${data.density} g/cm³` : "Density: N/A";
                errorMessage.textContent = "";
            } else {
                errorMessage.textContent = "Planet data not found.";
            }
        })
        .catch(error => {
            errorMessage.textContent = "Failed to retrieve planet information. Please try again.";
            console.error("Error fetching planet data:", error);
        });
    }
});
