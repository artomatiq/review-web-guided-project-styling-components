import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../constants'
import Details from './Details'
import Friend from './Friend'

import styled from 'styled-components'

const Heading = styled.h1`
  font-size: 100px;
  border: 3px dashed;
  padding: 20px;
`

const Page = styled.div `
  background-color: beige;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 100px;
`

document.querySelector('html').style.height = '100vh'
document.querySelector('html').style.width = '100vw'
document.querySelector('body').style.height = '100vh'
document.querySelector('body').style.width = '100vw'
document.querySelector('#root').style.height = '100vh'
document.querySelector('#root').style.width = '100vw'




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
    <Page className='container'>
      <Heading>My friends:</Heading>
      {
        friends.map(fr => {
          return <Friend key={fr.id} info={fr} action={openDetails} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </Page>
  )
}
