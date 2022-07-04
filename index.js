let contenedor = document.getElementById("contenedor");
let btnSiguiente = document.getElementById("btnSiguiente");
let btnAnterior = document.getElementById("btnAnterior");
let btnPower = document.getElementById("btnPower");

const urlPokemon = "https://pokeapi.co/api/v2/pokemon/";
const mostrarPokemon = async function (id) {
  try {
    let resultado = await fetch(`${urlPokemon}${id}/`);
    let resultadoJson = await resultado.json();
    //console.log(resultadoJson);
    await crearPokemon(resultadoJson);
  } catch (error) {
    console.log(error);
  }
};

const urlPokemoonEfecto = "https://pokeapi.co/api/v2/ability/";
const mostrarPokemonEfecto = async function (id) {
  try {
    let result = await fetch(`${urlPokemoonEfecto}${id}/`);
    let resultJs = await result.json();
    console.log(resultJs.effect_entries[0].effect);
    //await crearPokemon(resultJs);
  } catch (error) {
    console.log(error);
  }
};
mostrarPokemonEfecto(1);

function getCard(number) {
  for (let i = 1; i <= number; i++) {
    mostrarPokemon(i);
  }
}
getCard(3);

async function crearPokemon(pokemon) {
  contenedor.innerHTML += `
    <div class="row">
      <div class="col"></div>
      <div class="card" style="width: 17rem">
        <img src="${
          pokemon.sprites.front_default
        }" class="card-img-top" alt="..." />
        <div class="card-body">
          <h1 class="card-title">${pokemonNombre(pokemon)}</h1>
          <p class="card-text">
            #${pokemon.id.toString().padStart(3, 0)}
          </p>
          <button id="btnPower-${pokemon.id.toString()}" class="btn btn-primary" type="button">Power</button>
        </div>
        </div>
    </div>
    `;
    const btnPower = document.getElementById(`btnPower-${pokemon.id.toString()}`);
    btnPower.addEventListener("click", ()=> {
      console.log("efecto");
    });
}

function createBtnPower() {
  let btn = document.createElement("button");
  btn.classList.add("btn btn-primary");
  btn.className = "btnPower"
  btn.innerHTML = "power";
  console.log(btn)

  btnPower.addEventListener("click", ()=> {
    console.log("efecto");
  });
  return btnPower
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
let limit = 3;
function traerSiguientesPokemons(offset, limit) {
  for (let i = offset; i < offset + limit; i++) {
    mostrarPokemon(i);
  }
}

btnSiguiente.addEventListener("click", () => {
  offset += 3;
  traerSiguientesPokemons(offset, limit);
  contenedor.innerHTML = "";
});

btnAnterior.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 3;
    traerSiguientesPokemons(offset, limit);
    contenedor.innerHTML = "";
  }
});
