import {addMapa,alteraTamanho} from './mapas.js'

let classeSelecionada = 'start'
let tamanho = '25.80'

const selecionaClasse = (elemento) =>{
    const classes = elemento.className

    if ( classes.includes('parede')) return 'parede'
    if ( classes.includes('start')) return 'start'
    if ( classes.includes('fim')) return 'fim'
    if ( classes.includes('nada')) return 'nada'
    
}

const selecionaBotao = (elemento) =>{

    if(elemento.classList.contains('seletor')){
        const antigoSelecionado =  document.querySelector('.selecionado')
    antigoSelecionado.classList.remove('selecionado')
    elemento.classList.add('selecionado')
    classeSelecionada = selecionaClasse(elemento)
    }
}

const seletores = document.querySelector('.seletores')
seletores.addEventListener('click',(elemento)=>{
    selecionaBotao(elemento.target)
})

const apagaTela = () =>{
    const divTela = document.querySelector('.mapa')
    divTela.remove()
}

const btCriaTela = document.querySelector('#criaTela')
btCriaTela.addEventListener('click',()=>{
    tamanho = '25.80'
    apagaTela()
    criaTela()
    const tela = document.querySelector('.mapa')
    const linhas = Number(document.querySelector('#linha').value)
    const colunas = Number(document.querySelector('#coluna').value)
    mostrarBotao()
    criaCelulas(tela,linhas,colunas)
})

const btSalvaMapa = document.querySelector('#salvarMapa')
btSalvaMapa.addEventListener('click',()=>{
    const colunas = Number(document.querySelector('#coluna').value)
    fazMapa(colunas)
})


const criaTela = () =>{
    const main = document.querySelector('main')
    const divMapa = document.createElement('div')
    divMapa.classList.add('mapa')
    main.appendChild(divMapa)
}

const adicionaClasseSelecionada = (elemento)=>{
    const mapa = document.querySelector('.mapa')
    const velhoStart = mapa.querySelector('.start')
    const velhofim = mapa.querySelector('.fim')

    if(classeSelecionada === 'start' && velhoStart !== null) velhoStart.classList.remove('start')

    if(classeSelecionada === 'fim' && velhofim !== null) velhofim.classList.remove('fim')

    elemento.setAttribute('class','celula')
    elemento.classList.add(classeSelecionada)
}

const criaCelulas = (local,linhas=15,colunas=21) =>{
    local.setAttribute('style','width: calc(25.80px*'+colunas+');')

    for(let linha = 0; linha<linhas;linha++){
        for(let coluna = 0; coluna<colunas; coluna++){
            const celula = document.createElement('div')
            celula.classList.add('celula','nada')

            celula.addEventListener('click',(elemento)=>{
                adicionaClasseSelecionada(elemento.target)
                console.dir(elemento.target)
            })

            local.appendChild(celula)
        }
    }
}

const fazMapa = (colunas) =>{
    const mapa = []
    let linha = ''
    const celulas = document.querySelectorAll('.celula')

    celulas.forEach((elemento,index)=>{

        if(elemento.classList.contains('parede')) linha+='W'
        if(elemento.classList.contains('start'))  linha+='S'
        if(elemento.classList.contains('fim'))    linha+='F'
        if(elemento.classList.contains('nada'))   linha+=' '

        if(  (index+1)%colunas === 0 ){
            mapa.push(linha)
            linha = ''
        }
    })
    mostrarResultado(mapa)
    addMapa(mapa)
}

const mostrarBotao = ()=>{
    const aumentar = document.querySelector('.aumentar')
    const diminuir = document.querySelector('.diminuir')
    aumentar.style.display = 'block'
    diminuir.style.display = 'block'
}

document.querySelector('.aumentar').addEventListener('click',()=>{
    const colunas = Number(document.querySelector('#coluna').value)
    let novoTamanho = Number(tamanho)
    tamanho = alteraTamanho(novoTamanho,colunas,'+')
})
document.querySelector('.diminuir').addEventListener('click',()=>{
    const colunas = Number(document.querySelector('#coluna').value)
    let novoTamanho = Number(tamanho)
    tamanho = alteraTamanho(novoTamanho,colunas)

})

const mostrarResultado = (mapa) =>{
    const resultado = document.querySelector('#resultado')
    resultado.value = mapa   
    resultado.select()
    document.execCommand('copy')
}