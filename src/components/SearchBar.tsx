import { useState } from 'react'
import styled from 'styled-components'
import { useMovieStore } from '@/lib/store'

export const SearchBar = () => {
  const { onSearchMovie } = useMovieStore()

  const [searchInput, setSearchInput] = useState('')

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = searchInput.trim()
    if (e.key === 'Enter' && input !== '') {
      onSearchMovie(input)
    }
  }
  return (
    <Container>
      <div style={{ margin: '24px 0' }}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onSearch}
        />
      </div>
    </Container>
  )
}

const Container = styled.div``
