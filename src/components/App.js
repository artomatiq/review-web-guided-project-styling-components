import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../constants'
import Details from './Details'
import Friend from './Friend'

import styled from 'styled-components'

const Heading = styled.h1`
  font-size: 7vw;
  border: 3px dashed;
  padding: 2vw;
`

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState('1')

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='container'>
      <Heading>My friends:</Heading>
      {
        friends.map(fr => {
          return <Friend key={fr.id} info={fr} action={openDetails} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
