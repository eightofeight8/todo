import { useContext } from 'react';
import { delImg, editImg } from '../../assets/image'
import './notes.css'
import { NotesContext } from '../../store/NotesProvider';

const NotesItem = ({line, note}) => {
    const {id, desc, date, title} = note;
    const {delNote, getNote, openDelModal, lang, words} = useContext(NotesContext);
    // console.log(getNote);
  return (
    <div className="card">
        <div className={ line ? '' : "card__content" }>
            <h3 className="card__title">{title}</h3>
            <p className="card__date">{date}</p>
        </div>
        <p className="card__desc">{desc}</p>
        <div className="card__controls">
            <button onClick={()=>{getNote(id)}} className="btn">
                <img src={editImg} alt="" />
                {words.editbtn[lang]}
            </button>
            <button onClick={()=>{openDelModal(id)}} className="btn btn_red">
                <img src={delImg} alt="" />
                {words.deledit[lang]}
            </button>
        </div>
    </div>
  )
}

export default NotesItem