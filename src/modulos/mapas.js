const mapas = 
    {'mapa1':
   ["WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
    ],
    'mapa2':
   ["WWWWWWWWWWWWWWWWWWWWW",
    "W W W           W   W",
    "W W W WWW WWWWW WWW W",
    "S W   W       W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W WWW",
    "W WWW WWWWW WWWWW W F",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W W",
    "W W   W W W   W W W W",
    "WWWWW W W WWWWW   W W",
    "W       W       WWW W",
    "W WWWWWWWWWWWWWWW W W",
    "W                   W",
    "WWWWWWWWWWWWWWWWWWWWW",
    ],
    'mapa3':
    ['WSWWWWWWWWWWWWWWWWWWW',
     'W     W             W',
     'WW  WW   WW  W W W  W',
     'W W     W  W W W WWWW',
     'W  W W       W W  W W',
     'W     W WWWWW   WW  W',
     'WWWW  W    W W      W',
     'W   WWWWW WW  WWWW  W',
     'WW  W    WW       W W',
     'W W W W     WW  WFW W',
     'W W   W W WWW  W W  W',
     'W W W WWW W W W     W',
     'W WW   W W   W  W W W',
     'W    W          W W W',
     'WWWWWWWWWWWWWWWWWWWWW'
     ]}
     





const selectMap = (mapa) =>{
     return mapas[mapa]
}

export const quantidadeMapa = () =>{
    const chaves = Object.keys(mapas)
    return chaves.length
}

export const addMapa = (obj)=>{
    const quantidade = quantidadeMapa()
    const mapaName = 'mapa'+(quantidade+1)
    mapas[mapaName] = obj
    console.log(mapas)
}

export const alteraTamanho = (novoTamanho,colunas,operacao='-') =>{

    if(operacao !=='+') novoTamanho -= 3
    if(operacao === '+') novoTamanho += 3


    if((novoTamanho*colunas)<800 && (novoTamanho*colunas)>107){
        const celulas = document.querySelectorAll('.celula')
        const mapa = document.querySelector('.mapa')
        mapa.setAttribute('style','width:'+(novoTamanho*colunas)+'px;')

        celulas.forEach(elemento =>{
            elemento.style.width = novoTamanho+'px'
            elemento.style.height = novoTamanho+'px'
        })
        return novoTamanho
    }  

    return '35.80'
    
}


export default selectMap