import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <NoteCard title="Mi primera nota" date="Hoy" content="Mi primera nota" tags="#tag1, #tag2" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>
      </div>
    </>
  )
}

export default Home