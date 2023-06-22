'use client'

import styled from 'styled-components'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  padding-top: 100px;
`
