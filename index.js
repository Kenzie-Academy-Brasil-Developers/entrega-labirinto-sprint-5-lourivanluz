const mapLayout = [
    "WWWWWWWWWWWWWWWWWWWWW",
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
];


const criaCelula = (tipoCelula) =>{
    const celula = document.createElement('div')
    if(tipoCelula === 'W') celula.classList.add('celula','parede')
    if(tipoCelula === ' ') celula.classList.add('celula','vago')
    if(tipoCelula === 'S') celula.classList.add('celula','start','vago','player')
    if(tipoCelula === 'F') celula.classList.add('celula','final','vago')

    return(celula)
}

const montaMap = (mapLayout) =>{
    const mapa = document.querySelector('.mapa')
    for (let linha = 0; linha<mapLayout.length; linha++){
        for(let coluna = 0; coluna<mapLayout[linha].length; coluna++){

            let tipoCelula = mapLayout[linha][coluna]
            const celula = criaCelula(tipoCelula)
            celula.setAttribute('block-position',`${linha}:${coluna}`)
            mapa.appendChild(celula)
        }
    }

}

const reset = () =>{
    const mapa = document.querySelector('.mapa')
    mapa.remove()
    const local = document.querySelector('main > div:nth-child(2)')
    local.appendChild(document.createElement('div')).classList.add('mapa')

    montaMap(mapLayout)

}

const movimentar = (letra,posicao)=>{
    const posicaoXY = posicao.split(':')
    const linha = Number(posicaoXY[0])
    const coluna = Number(posicaoXY[1])
    if(letra === 'w') return `${linha-1}:${coluna}`
    if(letra === 's') return `${linha+1}:${coluna}`
    if(letra === 'a') return `${linha}:${coluna-1}`
    if(letra === 'd') return `${linha}:${coluna+1}`
}

const buscaPorAtributo = (atributo,valor) =>{
    const celulas = document.querySelectorAll('.celula')
    const alvo = [...celulas].filter(item=>item.getAttribute(atributo)=== valor)
    return alvo[0]
}

const podeMovimentar = (elemento)=>{
    return elemento!== undefined ? elemento.classList.contains('vago') : false
}

const consdicaoVitoria = (elemento)=>{
    return elemento!== undefined ? elemento.classList.contains('final') : false
}

const criaTelaVitoria =() =>{
    document.body.appendChild(document.createElement('div')).classList.add('telaVitoria')
    const div = document.querySelector('.telaVitoria')
    const mensagemVitoria = document.createElement('p')
    mensagemVitoria.innerText = 'vitoria'
    div.appendChild(mensagemVitoria)
    div.addEventListener('click',()=>{
        reset()
        div.remove()
    })
}

const atualizaPosicao = (letra) =>{
    const jogador =  document.querySelector('.player')
    const posicaoJogador = jogador.getAttribute('block-position')
    const novoMovimento = movimentar(letra,posicaoJogador)
    const alvo = buscaPorAtributo('block-position',novoMovimento)
    if(podeMovimentar(alvo)) {
        alvo.classList.add('player')
        jogador.classList.remove('player')
        if(consdicaoVitoria(alvo)) criaTelaVitoria()
    }
}

document.addEventListener('keydown',(evento)=>{
    const letra = evento.key
    if(!document.querySelector('.telaVitoria')) atualizaPosicao(letra)
    
})

montaMap(mapLayout)
