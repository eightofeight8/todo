import { useContext, useState } from "react"
import { gridImg, listImg } from "../../assets/image"
import './notes.css'
import NotesItem from "./NotesItem"
import { NotesContext } from "../../store/NotesProvider"

const Notes = () => {
    const [line, setLine] = useState(true)
    const {notes, search, lang, words} = useContext(NotesContext);
    // console.log(notes);
    const list = notes.filter((elem)=>{
        const result = elem.title.concat(elem.desc).toLowerCase().includes(search.toLowerCase());
        return result
    })
  return (
    <div className="notes container">
        <div className="notes__top">
            <h2 className="notes__title">
                { list.length > 0 ? 
                words.infobar[lang] 
                : words.noinfobar[lang]}
            </h2>
            <button onClick={()=>{ setLine(!line)}} className="notes__btn">
                <img src={ line ? listImg : gridImg } alt="" />
                <span>
                    { line ? words.list[lang] : words.grid[lang] }
                </span>
            </button>
        </div>
        <div className={`notes__list ${line ? '' : 'active'}`}>
            {
                list.map((elem)=>(
                    <NotesItem key={elem.id} line={line} note={elem}/>
                ))
            }
        </div>
    </div>
  )
}

export default Notes