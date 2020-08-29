var pokemon_agregados_arr=[]
var pokemon_hp_arr=[]
var pokemon_ataque_arr=[]
var pokemon_defensa_arr=[]
var pokemon_ataqueespecial_arr=[]
var pokemon_defensaespecial_arr=[]
var pokemon_velocidad_arr=[]

$(function () {
    $("#buscar").click(function (e) {
        e.preventDefault();
        var id_personaje = $("#busqueda").val();
        if(id_personaje>807 || id_personaje<0 || id_personaje==="") {
            alert('Ingrese un pokémon entre 1 y 807 o el nombre de un pokémon hasta Alola')
            $('input').val("");
            $("input").focus();
        }
        else{
        console.log(id_personaje);
        getpersonaje(id_personaje);
        $('input').val("");
        $("input").focus();
        }  
    });

});



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
        <div class="card-tittle" style="background-color:#ef5350; color:white">
            <p class="card-text" style="text-align:center">${nombre.toUpperCase()}</p>
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
        //estadisticas pokemon
        console.log(pokemon_agregados_arr)
        var hp=poke.stats[0].base_stat
        console.log(hp)
        pokemon_hp_arr.push(hp)
        var ataque=poke.stats[1].base_stat
        console.log(ataque)
        pokemon_ataque_arr.push(ataque)
        var defensa=poke.stats[2].base_stat
        pokemon_defensa_arr.push(defensa)
        console.log(defensa)
        var ataque_especial=poke.stats[3].base_stat
        pokemon_ataqueespecial_arr.push(ataque_especial)
        console.log(ataque_especial)
        var defensa_especial=poke.stats[4].base_stat
        pokemon_defensaespecial_arr.push(defensa_especial)
        console.log(defensa_especial)
        var velocidad=poke.stats[5].base_stat
        pokemon_velocidad_arr.push(velocidad)
        console.log(velocidad)

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
            type: "bar",
            dataPoints: [
                { label: "HP",                    y:parseFloat(pokemon_hp_arr)},
                { label: "Ataque",                    y:parseFloat(pokemon_ataque_arr)},
                {label: "Defensa",                    y:parseFloat(pokemon_defensa_arr)},
                {label: "Ataque Especial",                    y:parseFloat(pokemon_ataqueespecial_arr)},
                { label: "Defensa Especial",                    y:parseFloat(pokemon_defensaespecial_arr)},
                { label: "Velocidad",                    y:parseFloat(pokemon_velocidad_arr)}
                
            ]
        }
        ]
    };
    
    $("#grafico").CanvasJSChart(options);
    }


