$(function () {

  let endpoint = "https://pokeapi.co/api/v2/pokemon";
  let limit = 151;

  const list = $("#list");
  const buttonOriginal = $("#original");
  const button3d = $("#3d");

  getPokemons(true);

  buttonOriginal.on("click", function() {
    list.fadeOut(1000, function() {
      $(this).empty();
      getPokemons(true);
    });
    list.fadeIn(1000);
  });

  button3d.on("click", function() {
    list.fadeOut(500, function() {
      $(this).empty();
      getPokemons(false);
    });
    list.fadeIn(500);
  });

  function getPokemons(original) {
    $.ajax({
      url: endpoint + "?limit=" + limit,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log(result);
  
        let array = result.results;
  
        $.each(array, function (index, pokemon) {
          let id = getID(pokemon.url);       
          let imgOriginal = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";
          let img3d = "https://img.pokemondb.net/sprites/home/normal/" + pokemon.name + ".png";        
          let result = (original) ? imgOriginal : img3d;             
          let structure = "<li class='card'>" +
            "<span class='number'>" + parseInt(id) + "</span>" +
            "<img src='" + result + "' alt='" + pokemon.name + "'>" +
            "<span class='name'>" + pokemon.name + "</span>" +
            "</li>";
          list.append(structure);
        });
      }
    });
  }

  function getID(url) {
    let id = url.split('/').reverse()[1];
    return id.toString().padStart(3, "000")
  }

});