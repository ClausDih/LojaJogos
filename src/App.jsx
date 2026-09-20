import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    api.get('/jogos')  /*aqui eu to fazendo a requisição com GET (servidor, me dê os jogos que estão lá no localhost 8080)*/
    .then((resposta) => { /*qdo a requisição der certo, faça isso, ou seja, me traga os dados q o servidor deu pro react, que são meus jogos cadastraods*/
      setJogos(resposta.data) /*mas a resposta vem dentro de um obj do axios, ou seja ele pega os dados q vieram do servidor e coloca na lista de jogos*/
    })
    .catch(() => {    /*aqui é a msg de erro caso o codigo acima, a requisição, falhe (é o meu else)*/
      console.log('Erro ao buscar os jogos')
    })
  }, [])   /*me mostre a lista quando o useEffect for montado*/

  return (  /*esse meu return é tudo que eu vou ver na minha página se não der erro quando a requisição acontecer*/
    <>
    <h1>Loja de jogos</h1>

    {jogos.map((jogo) => (    /*eu uso o .map  para ele passar por cada objeto da lista e colocar ele no formato abaixo q eu preciso. O key sabe qual é cada jogo pelo id, essa é a minha chave para classificação. qdo eu uso {}, to colocando javascript dentro do jsx pq é assim q se faz.*/
      <div key={jogo.id}>    
        <h2>{jogo.titulo}</h2>
        <p>Gênero: {jogo.genero}</p>
        <p>Preço: {jogo.preco}</p>
        <p>Estoque: {jogo.estoque}</p>
      </div>
    ))}
    </>
  )
}

export default App