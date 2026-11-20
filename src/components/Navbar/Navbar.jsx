import { useContext, useState } from "react";
import { backImg, closeImg, searchImg } from "../../assets/image"
import './navbar.css';
import Transition from "../Transition/Transition";
import { NotesContext } from "../../store/NotesProvider";

const Navbar = () => {
    const [show, setShow] = useState(true);
    const { search, setSearch, lang, setLang, words } = useContext(NotesContext)
    const hideHandle = () => {
        setShow(!show);
        setSearch('')
    }
    return (
        <header className="header">
            <Transition className="header__content" show={show}>
                {
                    
                        lang === 'ru'
                        ? <button onClick={() => setLang('uz')} className="header__lang">uz</button>
                        : lang === 'uz'
                            ? <button onClick={() => setLang('eng')} className="header__lang">eng</button>
                            : <button onClick={() => setLang('ru')} className="header__lang">ru</button>
                
            }
                <h1 className="header__title">
                    {words.appbartitle[lang]}
                </h1>
                <button onClick={hideHandle}>
                    <img src={searchImg} alt="" />
                </button>
            </Transition>
            <Transition className="header__form" show={!show}>
                <button onClick={hideHandle}>
                    <img src={backImg} alt="" />
                </button>
                <input
                    onChange={(event) => { setSearch(event.target.value); }}
                    type="text"
                    className="header__input container"
                    placeholder={words.appbarseacrch[lang]}
                    value={search}
                />
                <button onClick={() => { setSearch('') }}>
                    <img src={closeImg} alt="" />
                </button>
            </Transition>
        </header>
    )
}

export default Navbar