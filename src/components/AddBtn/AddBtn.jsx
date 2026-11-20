import { useContext } from 'react'
import { editImg } from '../../assets/image'
import './add-btn.css'
import { NotesContext } from '../../store/NotesProvider'

const AddBtn = () => {
    const {setModal} = useContext(NotesContext);
  return (
    <button onClick={()=>{ setModal(true)}} className="add-btn">
        <img src={editImg} alt="" />
    </button>
  )
}

export default AddBtn