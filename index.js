import  mapSelect, { quantidadeMapa,alteraTamanho }  from "./src/modulos/mapas.js"

let colunas = ''
let tamanho = '25.80'

const btReduzir = document.querySelector('#reduzir')
const btAdicionar = document.querySelector('#adicionar')

const reduzir = () =>{
    const fase = document.querySelector('.fase')
    const numeroDaFase = fase.innerText
    if(Number(numeroDaFase) > 1){
        fase.innerText = Number(numeroDaFase)-1
    }
}
const adicionar = () =>{
    const fase = document.querySelector('.fase')
    const numeroDaFase = fase.innerText
    const qtdMapa = quantidadeMapa()
    if(Number(numeroDaFase) < qtdMapa ){
        fase.innerText = Number(numeroDaFase)+1
    }
}

btReduzir.addEventListener('click',()=>{
    reduzir()
    reset()
    proximoMapa()
})

btAdicionar.addEventListener('click',()=>{
    adicionar()
    reset()
    proximoMapa()
    
})

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
    colunas=mapLayout[0].length
    mapa.setAttribute('style','width: calc(25.80px*'+colunas+');')

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
    const local = document.querySelector('.local')
    local.appendChild(document.createElement('div')).classList.add('mapa')
}


const proximoMapa = () =>{
    tamanho = '25.80'
    const nextMap = document.querySelector('.fase').innerText
    const selectorMap = 'mapa'+nextMap
    montaMap(mapSelect(selectorMap))
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
        adicionar()
        reset()
        proximoMapa()
        div.remove()
    })
}

const atualizaSprite = (letra) =>{
    const player = document.querySelector('.player')
    
    if(letra === 'w') player.style.backgroundImage = 'url(./src/img/Wplayer.png)'
    if(letra === 's') player.style.backgroundImage = 'url(./src/img/Splayer.png)'
    if(letra === 'a') player.style.backgroundImage = 'url(./src/img/Aplayer.png)'
    if(letra === 'd') player.style.backgroundImage = 'url(./src/img/Dplayer.png)'

    console.dir(player)
}

const atualizaPosicao = (letra) =>{
    const jogador =  document.querySelector('.player')
    const posicaoJogador = jogador.getAttribute('block-position')
    const novoMovimento = movimentar(letra,posicaoJogador)
    const alvo = buscaPorAtributo('block-position',novoMovimento)
    if(podeMovimentar(alvo)) {
        alvo.classList.add('player')
        jogador.classList.remove('player')
        jogador.style.backgroundImage = ''
        if(consdicaoVitoria(alvo)) criaTelaVitoria()
    }
}

document.addEventListener('keydown',(evento)=>{
    const letra = evento.key
    if(!document.querySelector('.telaVitoria')) {
        atualizaPosicao(letra)
        atualizaSprite(letra)
    }
    
})

document.querySelector('#criarMapa').addEventListener('click',()=>{
    const mataTexto = document.querySelector('#mapText').value
    criaMapaTexto(mataTexto)
})

document.querySelector('.aumentar').addEventListener('click',()=>{
    let novoTamanho = Number(tamanho)
    tamanho = alteraTamanho(novoTamanho,colunas,'+')
})
document.querySelector('.diminuir').addEventListener('click',()=>{
    let novoTamanho = Number(tamanho)
    tamanho = alteraTamanho(novoTamanho,colunas)
})


const criaMapaTexto= (texto) =>{
    const teste = texto.split(',')
    reset()
    montaMap(teste)
}


montaMap(mapSelect('mapa1'))
