
const informacion=[]
const numeroPokemon = parseInt(prompt('insete cantidad de pokemones a mostar 1-900'))
const indexDatos = document.querySelector('.contenedorApi')
const divflotante = document.querySelector('.Flotante_contenedor')
const cartaDatosTitulo = document.querySelector('.Flotante_titulo')
const cartaDatosImagen = document.querySelector('.Flotante_imagen')
const cartaDatosTexto = document.querySelector('.Flotante_texto')


if (isNaN(numeroPokemon)) {
    console.log("insetar un valor numerico")
}else{
    for(i=1;i<=numeroPokemon;i++){
        ejecutar()
    }

    async function ejecutar(){
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data= await res.json()
        var pokemon= new Array()
        pokemon["nombre"]=data.name
        pokemon["imagen"]=data.sprites.versions['generation-v']['black-white'].animated.front_default
        pokemon["orden_api"]= data.id
        informacion.push(pokemon)

    
    }        
}



setTimeout(()=>{


informacion.sort(function (a, b) {
        return a.orden_api - b.orden_api;
      });

console.log(informacion)


 informacion.map((e)=>{

    const carta = document.createElement('div')
    carta.classList.add('cartaContenedor')


    const contenedorName = document.createElement('p')
    contenedorName.classList.add('cartaName')
    contenedorName.innerHTML = e["nombre"]
  
    const contenedorImg = document.createElement('div')
    contenedorImg.classList.add('cartaContenedorImg')
  
    const imagen = document.createElement('img')
    imagen.classList.add('cartaImg')
    imagen.src = e["imagen"]
  
    // [Carta - Union de Contenido]
    contenedorImg.appendChild(imagen)
    carta.appendChild(contenedorName)
    carta.appendChild(contenedorImg)
  
    // [Carta - Insercion al HTML]
    indexDatos.appendChild(carta)
  

    carta.addEventListener('click', () => {
        divflotante.style.visibility = 'visible'
        eventoTarjetaFlotante(e["imagen"],e["nombre"],e["orden_api"])
      })
    
 })



},1000)


function eventoTarjetaFlotante (imagen,nombre,orden_pokemon_api) {

    divflotante.addEventListener('click', () => {
      divflotante.style.visibility = 'hidden'
      cartaDatosImagen.innerHTML = ''

      window.speechSynthesis.cancel()
    delete utterance.text
 
    })
  
    cartaDatosTitulo.innerHTML = nombre
    const imagenFlotante = document.createElement('img')
    imagenFlotante.classList.add('Flotante_img')
    imagenFlotante.src = imagen
    cartaDatosImagen.appendChild(imagenFlotante)
  
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${orden_pokemon_api}`)
    .then((resp) => resp.json())
    .then(function(data) {
     

    const textoIdiomas = data.flavor_text_entries
    const textoEspañol = []
    textoIdiomas.forEach((i) => {
        if (i.language.name === 'es') {
            textoEspañol.push(i.flavor_text)
        }
        })

    console.log(textoEspañol)

    const randomTexto = textoEspañol[Math.floor(Math.random() * textoEspañol.length)]
    cartaDatosTexto.innerHTML = randomTexto

    const utterance = new SpeechSynthesisUtterance()
    utterance.text = randomTexto
    utterance.lang = 'es-ES'
    utterance.rate = 1
    window.speechSynthesis.speak(utterance) 

    })

  }




