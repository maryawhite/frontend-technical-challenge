"use strict"

console.log("Hello!!!");

$(document).ready(function (){

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
                        // myPokemons += `<div><h4>${resultsObj.results[i].name}</h4></div>`
                        // remember to use ${} around your data
                        let url = resultsObj.results[i].url;

                        //do a fetch inside the fetch to get the url for each pokemon
                        fetch(url, {
                            "method": "GET",
                            "cache": "no-cache"
                        })
                            .then(function(res){
                                res.json()
                                    .then((resultsTwo) => {
                                        console.log(resultsTwo);

                                        // let myPokemons = "";
                                            myPokemons += `<div class="card-deck"><div class="card"><img class="card-img-top" src=${resultsTwo.sprites.front_default}><div class="card-body"><div><h4 class="card-title">${resultsTwo.name}</h4><p class="card-text">Weight: ${resultsTwo.weight}</p></div></div></div></div>`
                                        $("#pokemons").html(myPokemons);
                                    })
                            })
                    }
                })
                .catch(err => console.error(err))





        });


})