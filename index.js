let contenedor = document.getElementById("contenedor");
let btnSiguiente = document.getElementById("btnSiguiente");
let btnAnterior = document.getElementById("btnAnterior");
let inputBusqueda = document.getElementById("inputBusqueda");
let btnBusqueda = document.getElementById("btnBusqueda");

const urlPokemon = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = async function (id) {
  try {
    let resultado = await fetch(`${urlPokemon}${id}/`);
    if (resultado.status === 200) {
      let resultadoJson = await resultado.json();
      console.log(resultadoJson.name)
      crearPokemon(resultadoJson);
      //await getPokemonPower(resultadoJson)
    } else {
      mostrarPokemonInexistente();
    }
  } catch (error) {
    console.log(error);
  }
};

const urlPokemonEfecto = "https://pokeapi.co/api/v2/ability/";
const getPokemonPower = async function (id) {
  try {
    let result = await fetch(`${urlPokemonEfecto}${id}/`);
    let resultJson = await result.json();
    console.log(resultJson);
  } catch (error) {
    console.log(error);
  }
};

function crearPokemon(pokemon) {
  contenedor.innerHTML += `
    <div class="row" id="cardContenedor">
      <div class="col"></div>
      <div class="card" style="width: 17rem">
        <img src="${
          pokemon.sprites.front_default
        }" class="card-img-top" alt="..." />
        <div class="card-body">
          <h1 } class="card-title">${pokemonNombre(pokemon)}</h1>
          <p class="card-text">
            #${pokemon.id.toString().padStart(3, 0)}
          </p>
          <button id="btnPower-${pokemon.id}" class="btn btn-primary btn-power" type="button" data-pokemon-id=${pokemon.id} data-pokemon-name=${pokemonNombre(pokemon)}>Power</button>
        </div>
        </div>
    </div>
    `;
}

function pokemonNombre(pokemon) {
  let palabraConMayuscula = "";
  for (let i = 0; i < pokemon.name.length; i++) {
    let primeraLetra = pokemon.name[0].toUpperCase();
    let letrasRestantes = pokemon.name.slice(1);
    palabraConMayuscula = primeraLetra.concat(letrasRestantes);
  }
  return palabraConMayuscula;
}

let offset = 1;
let limit = 2;
async function traerSiguientesPokemons(offset, limit) {
  for (let i = offset; i < offset + limit; i++) {
    await getPokemon(i);
  }
  document.querySelectorAll(".btn-power").forEach( (item) => {
    item.addEventListener("click",async () => {
      console.log(item.dataset.pokemonId);
      swal ( item.dataset.pokemonName , item.dataset.pokemonName);
      await getPokemonPower(item.dataset.pokemonId);
    });
  });
}

traerSiguientesPokemons(offset, limit);

btnSiguiente.addEventListener("click", async () => {
  offset += 2;
  contenedor.innerHTML = "";
  await traerSiguientesPokemons(offset, limit);
});

btnAnterior.addEventListener("click", async () => {
  if (offset != 1) {
    offset -= 2;
    contenedor.innerHTML = "";
    await traerSiguientesPokemons(offset, limit);
  }
});

btnBusqueda.addEventListener("click", () => {
  if (inputBusqueda.value = "") {
    crearPokemon(inputBusqueda.value);
    
    console.log("chau");
  } else {
    mostrarInputVacio();
  }
  inputBusqueda.value = "";
});

function mostrarInputVacio() {
  Toastify({
    text: "ingrese un Pokemon",
    duration: 6000,
  }).showToast();
}

function mostrarPokemonInexistente() {
  Toastify({
    text: "Pokemon no encontrado",
    duration: 6000,
  }).showToast();
}
