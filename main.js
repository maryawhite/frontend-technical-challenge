"use strict"

console.log("Hello!!!");

$(document).ready(function (){

/** THIS FIRST FETCH GETS THE LIST OF POKEMONS */

    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200", {
        "method": "GET",
        "cache": "no-cache"
    })
        .then(function (response) {
            response.json()
                .then((resultsObj) => {
                    console.log(resultsObj);

                    let myPokemons = "";
                    for (let i = 0; i < resultsObj.results.length; i++) {

                        let url = resultsObj.results[i].url;

                        /** THIS SECOND FETCH INSIDE OF THE FOR LOOP GETS THE INFO OUT OF THE URL THAT WAS PROVIDED IN THE FIRST FETCH */
                        fetch(url, {
                            "method": "GET",
                            "cache": "no-cache"
                        })
                            .then(function(res){
                                res.json()
                                    .then((resultsTwo) => {
                                        console.log(resultsTwo);

                                        /** FOREACH LOOP TO GET THE POKEMON'S TYPE */
                                        let types = resultsTwo.types;
                                        let itsType = "";
                                        types.forEach(function(item, index, arr){
                                            /** IF BLOCK TO GET RID OF THE TRAILING COMMA WHEN THERE'S ONLY ONE ITEM */
                                            if(index === types.length -1 ){
                                                itsType += item.type.name;
                                            } else {
                                                itsType += item.type.name + ", ";
                                            }

                                        })

                                        /** FOREACH LOOP TO GET THE POKEMON'S ABILITIES */
                                        let abilities = resultsTwo.abilities;
                                        let itsAbilities = "";
                                        abilities.forEach(function(item, index){
                                            if(index === abilities.length - 1) {
                                                itsAbilities += item.ability.name;
                                            } else {
                                                itsAbilities += item.ability.name + ", ";
                                            }
                                        })

                                        /** FOREACH LOOP TO GET THE POKEMON'S STATS */
                                        let stats = resultsTwo.stats;
                                        let itsStats = "";
                                        stats.forEach(function(item, index){
                                            if(index === stats.length - 1) {
                                                itsStats += item.stat.name + " " + item.base_stat;
                                            } else {
                                                itsStats += item.stat.name + " " + item.base_stat + ", ";
                                            }
                                        })

                                        /** PUTTING INFORMATION INTO THE CARD VIA THE DIV IN THE INDEX.HTML */
                                        myPokemons += `<div class="card-deck col-sm-6 col-md-4 col-lg-4"><div class="card align-items-center mb-4"><img class="card-img-top w-50" src=${resultsTwo.sprites.front_default}><div class="card-body text-center"><div><h1 class="card-title">${resultsTwo.name}</h1><p>Base Experience ${resultsTwo.base_experience}</p><p class="card-text">Weight: ${resultsTwo.weight}</p><p>Height: ${resultsTwo.height}</p><p id="types">Type(s): ${itsType}</p><p>Abilities: ${itsAbilities}</p><p>Stats: ${itsStats}</p></div></div></div></div>`
                                        $("#pokemons").html(myPokemons);

                                    })
                            })
                    }
                })
                .catch(err => console.error(err))

        });

})