'use client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { MainSection } from '@/components/Home/MainSection'
import { Showcase } from '@/components/Home/Showcase'

export default function Home() {
  return (
    <Container>
      <MainSection />
      <Showcase />
      <div style={{ lineHeight: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, sed.
        Earum molestiae delectus natus obcaecati suscipit quibusdam quaerat
        velit amet error sit eius eligendi recusandae nobis, doloribus aut atque
        nesciunt cupiditate rerum, cumque dolore eaque facere necessitatibus?
        Quos dicta animi unde obcaecati natus rerum distinctio rem provident.
        Dignissimos eum dolor excepturi reprehenderit voluptatum ratione cum,
        aspernatur sunt autem optio nisi, vel numquam laudantium labore
        consequuntur odio quaerat odit voluptatibus. Vero, corporis est eius
        expedita quibusdam reprehenderit laborum esse vitae, corrupti
        repellendus nam aliquid. Eius odit ea, explicabo incidunt consectetur
        nemo tempore sint eligendi, natus dolores nisi. Illo amet adipisci id!
      </div>
    </Container>
  )
}

const Container = styled.div``
