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

export default selectMap