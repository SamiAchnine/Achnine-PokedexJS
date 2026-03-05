let searchButton = document.getElementById("search");
let errorDisp = document.getElementById("errorDisp");
const imgElement = document.getElementById("pokemonSprite");


function handleSearch() {
    let nameInput = document.getElementById("pokemonName");
    let name = nameInput.value;

    errorDisp.style.display = "none";
    imgElement.style.display = "none";

    if (name.length >= 30) {
        errorDisp.textContent = "Text is too long";
        errorDisp.style.display = "block";
    }
    else if (name.toLowerCase() === "porygon2") {
        // porygon2 is the only pokemon to have a literal number in its name, which is caught by the regex expression. this is an exception for it.
        fetchData(name);
    }
    else if (name.length === 0) {
        errorDisp.textContent = "Text is too empty";
        errorDisp.style.display = "block";
    }
    else if (/^[a-zA-Z-]+$/.test(name) === false) {
        errorDisp.textContent = "text must contain only letters and hyphens"
        errorDisp.style.display = 'block';
    }
    else {
        fetchData(name);
    }
    //fetchData(name);
}

searchButton.addEventListener("click", handleSearch);



// ── PROVIDED STARTER CODE — do not modify ─────────────────
async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response   = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data          = await response.json();
    const pokemonSprite = data.sprites.front_default;

    imgElement.src           = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}