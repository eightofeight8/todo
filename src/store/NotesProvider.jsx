import { createContext, useEffect, useState } from "react"
import words from "../assets/lang";
export const NotesContext = createContext(null);

const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'React',
      date: '07.03.2022',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    },
    {
      id: 2,
      title: 'Vue.js',
      date: '15.08.2020',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    },
    {
      id: 3,
      title: 'Angular',
      date: '20.01.2026',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    },
  ])
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null)
  const [currentId, setCurrentId] = useState(0);
  const [noteInfo, setNoteInfo] = useState(null);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('ru')
  const openDelModal = (id) => setDelId(id);
  const closeDelModal = () => setDelId(null);
  
  const addNote = (item)=>{
    setNotes([...notes, item])
    setCurrentId(item.id);
    setModal(false);
  }
  
  const delNote = (id)=>{
    const newNotes = notes.filter((elem)=>(elem.id != id))
    setNotes(newNotes);
    setDelId(null)
  }
  
  const getNote = (id)=>{
    const value = notes.find((elem)=>(elem.id == id))
    setNoteInfo(value);
    setModal(true)
  }
  
  const editNote = (item)=>{
    const newNotes = notes.map((elem)=>{
      if (elem.id == item.id) {
        elem.title = item.title;
        elem.desc = item.desc;
        elem.date = item.date;
      }
      return elem
    })
    setNotes(newNotes);
    setModal(false);
    setNoteInfo(null)
  }
  
  const closeModal = ()=>{
    setModal(false);
    setNoteInfo(null);
  }
  
  useEffect(()=>{
    let localNotes = localStorage.getItem('notes');
    localNotes = JSON.parse(localNotes);
    if (localNotes) {
      setNotes(localNotes);
      const lastIndex = localNotes.length - 1;
      const id = lastIndex >= 0 ? localNotes[lastIndex].id : 0
      setCurrentId(id)
    }
    let localLang = localStorage.getItem('lang');
    if (localLang) {
      setLang(localLang)
    }
  }, [])
  
  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  
  useEffect(()=>{
    localStorage.setItem('lang', lang)
  }, [lang])

  return (
    <NotesContext value={
        {notes, modal, setModal, currentId, addNote, delNote, getNote, noteInfo, editNote, closeModal, delId, openDelModal,closeDelModal, search, setSearch, lang, setLang, words}
    }>
        {children}
    </NotesContext>
  )
}

export default NotesProvider