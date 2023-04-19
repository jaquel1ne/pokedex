
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

/*function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
*/
// incluindo card
function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>

      `
    <div class="flip-card">  
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
          </div>
      </li>
    
      
      <div class="flip-card-back ${pokemon.type}">
        <div class="backInf">
            <p class="backInfTitle"><strong>Height:</strong></p>
            <p id="height" class="inf">${pokemon.height}</p>
        </div>
        <div class="backInf">
            <p class="backInfTitle"><strong>Weight:</strong></p>
            <p id="weight" class="inf">${pokemon.weight}</p>
        </div>
        <div class="backInf">
            <p class="backInfTitle"><strong>Abilites:</strong></p>
            <div class="inf">
                ${pokemon.abilities.map((ability) => `<li class="">${ability.replace('-', ' ')}</li>`).join('')}
            </div>
        </div>
      </div>
        </div>
      </div>
    </div>
      `
      ).join('')
      pokemonList.innerHTML += newHtml
    })
  }
  

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemons(offset, limit)
    }
})