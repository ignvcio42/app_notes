import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ noteData, type, onClose}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    const [error, setError] = useState(null);

    // Agregar nota
    const addNewNote = async () => {};

    // Editar nota
    const editNote = async () => {};

    const handleAddNote = async () => {
        if(!title){
            setError("Porfavor introducir titulo");
            return;
        }

        if(!content){
            setError("Porfavor introducir contenido");
            return;
        }

        setError("");

        if(type === 'add'){
            editNote()
        }else{
            addNewNote()
        }
    }

  return (
    <>
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
                <MdClose className='text-xl text-slate-500'/>
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITULO</label>
                <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Mi primera nota'  value={title} onChange={({ target }) => setTitle(target.value)}/>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENIDO</label>
                <textarea className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Contenido' rows={10} value={content} onChange={({ target }) => setContent(target.value)}></textarea>
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
            
            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>AGREGAR</button>
        </div>
    </>
  )
}

export default AddEditNotes