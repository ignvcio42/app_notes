import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: 'add',
    data: null
  });

  const [AllNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShow: true,
      type: 'edit',
      data: noteDetails
    });
  }

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-users');

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-notes');

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An error occurred while getting all notes");
    }
    
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);
  
  
  return (
    <>
      <Navbar userInfo={userInfo}/>

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {AllNotes.map((item, index) => (
            <NoteCard key={item._id} title={item.title} date={item.createdOn} content={item.content} tags={item.tags} isPinned={item.isPinned} onEdit={() => handleEdit(item)} onDelete={() => {}} onPinNote={() => {}}/>
          ))}
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
        getAllNotes={getAllNotes}
      />

      </Modal>
    </>
  )
}

export default Home