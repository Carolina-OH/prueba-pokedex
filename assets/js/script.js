$(document).ready(function() {
    //asd

});

$("button").click(function (e) { 
    e.preventDefault();
    var id_personaje=$("#busqueda").val();
    console.log(id_personaje);
    getpersonaje(id_personaje);
    generarCard()
});

function getpersonaje(id) { 
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        success: function (response) {
            console.log("response==>", response)
            $("#card").append(generarCard(response));
            console.log(generarCard(response));
        }
    });
}

function generarCard(choosen) { 
var card=`
<div class="card" style="width: 18rem;">
<img src="${choosen.sprites.back_default}" class="card-img-fluid" alt="...">
  <div class="card-body">
    <p class="card-text">${choosen.name}</p>
  </div>
</div>
`
return card;
};