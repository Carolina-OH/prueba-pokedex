var pokemon_agregados_arr=[]

$(function () {
    //asd

});
$("#buscar").click(function (e) {
    e.preventDefault();
    var id_personaje = $("#busqueda").val();
    console.log(id_personaje);
    getpersonaje(id_personaje);
});

$("#limpiar").click(function (e) {
    $("#busqueda").empty()
})

function getpersonaje(id) {
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        success: function (response) {
            console.log("response==>", response)
            $("#card").empty();
            $("#card").append(generarCard(response));
            generarGrafico();

        }
    });
}

function generarCard(poke) {
    
    var nombre = poke.name
    var tipos 
    tipos = poke.types
    var tiposstr = ""
    tipos.forEach((tipos, index) => {
        tiposstr += `${tipos.type.name} `
    });
    console.log(tiposstr);
    pokemon_agregados_arr=[]
    var card = `
        <div class="card" style="width: 18rem;">
        <div class="card-tittle">
            <p class="card-text" style="text-align:center;">${nombre.toUpperCase()}</p>
            <p style="text-align:center;">Tipo: ${tiposstr}</p>
        </div>

        <p style="text-align:center;">Normal</p>
        <div class="d-flex justify-content-center">
        <img src="${poke.sprites.front_default}" class="card-img-top" style="width:100px;" alt="...">
        <img src="${poke.sprites.back_default}" class="card-img-top" style="width:100px;" alt="...">
        </div>

        <p style="text-align:center;">Shiny</p>
        <div class="d-flex justify-content-center">
        <img src="${poke.sprites.front_shiny}" class="card-img-top" style="width:100px;" alt="...">
        <img src="${poke.sprites.back_shiny}" class="card-img-top" style="width:100px;" alt="...">
        </div>
        </div>
        `
        var expbase=poke.base_experience
        var peso=poke.weight
        var altura=poke.height
        var datos_pokemon=[{"Peso": peso},{"Altura": altura},{"Experiencia_base": expbase}]
        pokemon_agregados_arr.push(datos_pokemon)
        console.log(pokemon_agregados_arr)
    return card;
};

function generarGrafico (poke) {
      //Better to construct options first and then pass it as a parameter
    var options = {
        title: {
            text: "Estadísticas Pokémon"              
        },
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "Altura (m)",              y: parseFloat(pokemon_agregados_arr[0][1].Altura)  },
                { label: "Peso (Kg)",                y: parseFloat(pokemon_agregados_arr[0][0].Peso)   },
                { label: "Experiencia Base",    y: parseFloat(pokemon_agregados_arr[0][2].Experiencia_base)}
                
            ]
        }
        ]
    };
    
    $("#grafico").CanvasJSChart(options);
    }
