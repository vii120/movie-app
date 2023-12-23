'use client'
import { useState } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'

export const SearchBar = () => {
  const { onSearchMovie } = useMovieStore()

  const [searchInput, setSearchInput] = useState('')

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = searchInput.trim()
    if (e.key === 'Enter' && query !== '') {
      onSearchMovie({ query })
    }
  }
  return (
    <Container>
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={onSearch}
      />
    </Container>
  )
}

const Container = styled.div``

const Input = styled.input`
  appearance: none;
  -webkit-appearance: none;
  border: none;

  width: 100%;
  padding: 12px 18px;
  border-radius: 24px;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`
