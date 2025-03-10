import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: 'add',
    data: null
  });
  
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard title="Mi primera nota" date="Hoy" content="Mi primera nota" tags="#tag1, #tag2" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>
        </div>
      </div>

      <button className='w-16 h-16 flex items-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShow: true, type: 'add', data: null });
      }}>
        <MdAdd className='text-[32px] text-white mx-auto'/>
      </button>

      <Modal 
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

      <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({ isShow: false, type: 'add', data: null });
        }}
      />

      </Modal>
    </>
  )
}

export default Home