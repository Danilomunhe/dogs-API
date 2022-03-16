'use strict'

const pesquisarCachorro = async (raca) =>{
    const url = `https://dog.ceo/api/breed/${raca}/images`
  

    const response = await fetch(url)

    const data = await response.json()

    return data
}

const pesquisarRacas = async()=>{

    const url = 'https://dog.ceo/api/breeds/list/all'
    const response = await fetch(url)
    const data = await response.json()

    return Object.keys(data.message)
}

const criarImg = (imagem) =>{
    const img = document.createElement('div')
    img.classList.add('card')
    img.innerHTML = `<img src="${imagem}" alt="">`

    return img
}
const carregarImagens = async() =>{
    const container = document.getElementById('imagem-container')
    const raca = document.getElementById('raca').value
    const imagens = await pesquisarCachorro(raca)

    const tagImagens = imagens.message.map(criarImg)

    container.replaceChildren(...tagImagens)
}

const carregarRacas = async ()=>{
    
    const lista = document.getElementById('lista-racas')
    const racas = await pesquisarRacas()
   
    //O join converte array emn string permitindo colocar caracteres no meio
    lista.innerHTML = `
    <option>
        ${racas.join('</option><option>')}
    </option>
    `
    
   
}
document.getElementById('pesquisar').addEventListener('click', carregarImagens)

carregarRacas()

//Modal

const abrirModal = ()=>{
    const modal = document.getElementById('modal')
    modal.classList.add('active')
}

const fecharModal = ()=>{
    const modal = document.getElementById('modal')
    modal.classList.remove('active')
}

document.getElementById('abrir-modal').addEventListener('click', abrirModal)
document.getElementById('fechar-modal').addEventListener('click', fecharModal)
document.getElementById('modal').addEventListener('click', fecharModal)
