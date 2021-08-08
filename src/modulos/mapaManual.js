import {addMapa} from './mapas.js'

let classeSelecionada = 'start'

const selecionaClasse = (elemento) =>{
    const classes = elemento.className
    if ( classes.includes('parede')){
        return 'parede'
    }
    if ( classes.includes('start')){
        return 'start'
    }
    if ( classes.includes('fim')){
        return 'fim'
    }
    if ( classes.includes('nada')){
        return 'nada'
    }
    
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
    apagaTela()
    criaTela()
    const tela = document.querySelector('.mapa')
    const linhas = Number(document.querySelector('#linha').value)
    const colunas = Number(document.querySelector('#coluna').value)
    
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
    for(let linha = 0; linha<linhas;linha++){
        for(let coluna = 0; coluna<colunas; coluna++){
            const celula = document.createElement('div')
            celula.classList.add('celula','nada')
            celula.setAttribute('style','width: calc(80vw/'+colunas+');height: calc(80vw/'+colunas+');max-width: calc(800px/'+colunas+');max-height: calc(800px/'+colunas+');')
            celula.addEventListener('click',(elemento)=>{
                adicionaClasseSelecionada(elemento.target)
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

        if(elemento.classList.contains('parede')){
            linha+='W'
        }
        if(elemento.classList.contains('start')){
            linha+='S'
        }
        if(elemento.classList.contains('fim')){
            linha+='F'
        }
        if(elemento.classList.contains('nada')){
            linha+=' '
        }

        if(  (index+1)%colunas === 0 ){
            mapa.push(linha)
            linha = ''
        }
    })
    addMapa(mapa)
}