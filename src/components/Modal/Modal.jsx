import { useContext, useEffect, useState } from 'react';
import './modal.css';
import { NotesContext } from '../../store/NotesProvider';
import Transition from '../Transition/Transition';

const Modal = () => {
  const {
    modal,
    setModal,
    currentId,
    addNote,
    noteInfo,
    editNote,
    closeModal,
    delId,
    delNote,
    closeDelModal,
    lang,
    words,
  } = useContext(NotesContext);

  const [input, setInput] = useState('');
  const [textarea, setTextarea] = useState('');

  const addHandle = () => {
    const title = input.trim();
    const desc = textarea.trim();
    if (title.length && desc.length) {
      const item = {
        id: currentId + 1,
        title,
        date: new Date().toLocaleDateString(),
        desc,
      };
      addNote(item);
    }
  };

  const editHandle = () => {
    const title = input.trim();
    const desc = textarea.trim();
    if (title.length && desc.length) {
      const item = {
        id: noteInfo.id,
        title,
        date: new Date().toLocaleDateString(),
        desc,
      };
      editNote(item);
    }
  };

  useEffect(() => {
    if (noteInfo) {
      setInput(noteInfo.title);
      setTextarea(noteInfo.desc);
    } else {
      setInput('');
      setTextarea('');
    }
  }, [modal, noteInfo]);

  return (
    <>
      <Transition onClick={closeDelModal} className="modal" show={delId !== null}>
        <div className="modal__form" onMouseDown={(event) => event.stopPropagation()}>
          <h3 className="modal__title">
            {words.deledit ? words.deledit[lang] : 'Удалить заметку'}?
          </h3>

          <p>
            {words.delNote ? words.delNote[lang] : 'Вы действительно хотите удалить заметку?'}
          </p>

          <div className="modal__controls">
            <button onClick={closeDelModal} className="btn">
              {words.closebtn ? words.closebtn[lang] : 'Отмена'}
            </button>
            <button onClick={() => delNote(delId)} className="btn btn_red">
              {words.deledit ? words.deledit[lang] : 'Удалить'}
            </button>
          </div>
        </div>
      </Transition>

      <Transition onClick={closeModal} className="modal" show={modal}>
        <div className="modal__form" onMouseDown={(event) => event.stopPropagation()}>
          <h3 className="modal__title">
            {noteInfo ? words.titlewindowedit[lang] : words.titlewindow[lang]}
          </h3>
          <div className="modal__content">
            <label>
              <span>Title</span>
              <input
                value={input}
                type="text"
                placeholder="Title"
                onChange={(event) => setInput(event.target.value)}
              />
            </label>
            <label>
              <span>Content</span>
              <textarea
                value={textarea}
                rows={1}
                placeholder="Content"
                onChange={(event) => setTextarea(event.target.value)}
              ></textarea>
            </label>
          </div>
          <div className="modal__controls">
            <button onClick={closeModal} className="btn btn_red">
              {words.closebtn[lang]}
            </button>
            {noteInfo ? (
              <button onClick={editHandle} className="btn">
                {words.editwindowbtn[lang]}
              </button>
            ) : (
              <button onClick={addHandle} className="btn">
                {words.addbtn[lang]}
              </button>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Modal;