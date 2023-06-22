import { useEffect } from 'react'
import styled from 'styled-components'

export const FaqSection = () => {
  return (
    <Container>
      <div>FAQ</div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
        quidem accusantium. Obcaecati recusandae eius magnam quasi, saepe
        assumenda nisi dolore quis, suscipit repudiandae, culpa architecto eos
        cum deserunt? Officia earum delectus necessitatibus possimus nemo
        reiciendis quasi modi. Exercitationem atque, molestias dolores at nihil
        sapiente rem magni, quaerat deserunt laboriosam quas et voluptas saepe
        commodi fuga laborum voluptatibus ipsa officiis praesentium
        necessitatibus quos tempora assumenda optio numquam! Possimus optio
        libero ex cum consequuntur. Necessitatibus earum magnam, dolor voluptas
        eum, officiis cum, tenetur minima vel eius excepturi eos in error atque.
        Tenetur explicabo doloremque aspernatur repellat exercitationem
        laboriosam sunt ex necessitatibus voluptatem.
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 36px;
  line-height: 2;
`
