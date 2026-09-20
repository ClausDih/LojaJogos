import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [jogos, setJogos] = useState([])
  const [erro, setErro] = useState('')
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')


  useEffect(() => {
    api.get('/jogos')  /*aqui eu to fazendo a requisição com GET (servidor, me dê os jogos que estão lá no localhost 8080)*/
    .then((resposta) => { /*qdo a requisição der certo, faça isso, ou seja, me traga os dados q o servidor deu pro react, que são meus jogos cadastraods*/
      setJogos(resposta.data) /*mas a resposta vem dentro de um obj do axios, ou seja ele pega os dados q vieram do servidor e coloca na lista de jogos*/
    })
    .catch(() => {    /*aqui é a msg de erro caso o codigo acima, a requisição, falhe (é o meu else)*/
      setErro('Não foi possível carregar os jogos')
    })
  }, [])   /*me mostre a lista quando o useEffect for montado*/



function cadastrarJogo(evento) {
  evento.preventDefault()

  const novoJogo = {
    titulo: titulo,
    genero: genero,
    preco: Number(preco),
    estoque: Number(estoque)
  }

  api.post('/jogos', novoJogo)
  .then(() => {
    return api.get('/jogos')
  })
  .then((resposta) => {
    setJogos(resposta.data)

    setTitulo('')
    setGenero('')
    setPreco('')
    setEstoque('')
  })
}



  return (  /*esse meu return é tudo que eu vou ver na minha página se não der erro quando a requisição acontecer*/
    <>
    <h1>Loja de jogos</h1>

    <h2>Cadastrar jogo</h2>

    <form onSubmit={cadastrarJogo}>
      <label>Título:
        <input type="text"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}/>  
      </label>

      <label>Gênero:
        <input type="text"
        value={genero}
        onChange={(evento) => setGenero(evento.target.value)}/>
      </label>

      <label>Preço:
        <input type="number" 
        value={preco}
        onChange={(evento) => setPreco(evento.target.value)}/>
      </label>

      <label>Estoque:
        <input type="number" 
        value={estoque}
        onChange={(evento) => setEstoque(evento.target.value)}/>
      </label>

      <button type="submit">Cadastrar</button>
    </form>

    {erro ? (
      <p>{erro}</p>
    ) : (
      jogos.map((jogo) => (    /*eu uso o .map  para ele passar por cada objeto da lista e colocar ele no formato abaixo q eu preciso. O key sabe qual é cada jogo pelo id, essa é a minha chave para classificação. qdo eu uso {}, to colocando javascript dentro do jsx pq é assim q se faz.*/
      <div key={jogo.id}>    
        <h2>{jogo.titulo}</h2>
        <p>Gênero: {jogo.genero}</p>
        <p>Preço: {jogo.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
        <p>Estoque: {jogo.estoque == 0 ? 'Esgotado': `${jogo.estoque}`}</p>
      </div>
    ))
  )}
    </>
  )
}

export default App