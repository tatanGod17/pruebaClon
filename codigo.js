
document.addEventListener('DOMContentLoaded',() =>{

})

const getRandomNum = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

const fetchData = async () =>{
    try {
        var pokeString = document.getElementById("pokemonName").value;
        pokemonName = pokeString.toLowerCase();
        console.log(pokemonName);
        const res = await fetch ('https://pokeapi.co/api/v2/pokemon/'+ pokemonName);
        const data = await res.json();
        if (data.id > 0) {
            document.getElementById("imagePoke1").src = data.sprites.front_default;
            document.getElementById('title').innerHTML = data.name.toUpperCase();
            getHabilitys(data);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getHabilitys(obj) {
    console.log(obj);
    
    for (let index = 1; index < 5; index++) {
        var randomPower = getRandomNum(1, (obj.moves.length))
        var power;
        var textPower;
        //Validar poderes repetidos
        // for (let ind = 1; ind <= index; ind++) {
        //     if (document.getElementById('power' + index).innerHTML == obj.moves[randomPower].move.name){
        //         index = - 1;
        //     }
        //     else{
        //         document.getElementById('power' + index).innerHTML = obj.moves[randomPower].move.name;
        //     }      
        // }
        debugger;
        power = await fetchHability(obj.moves[randomPower].move.url);
        power.flavor_text_entries.forEach(element => {
            if (element.language.name == "es"){
                textPower = element.flavor_text;
                return true;
            }

        });

        document.getElementById('power' + index).innerHTML = obj.moves[randomPower].move.name + ": " + textPower;
    }
    
}


const fetchHability = async (url) => { 
    try {
        let res = await fetch (url);
        let data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

console.log(getRandomNum(1,151));
console.log(fetchData ());