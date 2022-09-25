import { useRef, useState } from "react"
import styles from './CreateArticle.module.css'
import { Editor, EditorState, convertToRaw } from "draft-js";
import { useAuth } from "../context/Auth";

export default function CreateArticle() {

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')

    const token = localStorage.getItem('@App:token')
    const auth = useAuth()

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const editor = useRef(null);
    function focusEditor() {
        console.log('content state', convertToRaw(editor.current));
    }

    const saveContent = (content) => {
        setContent(JSON.stringify(convertToRaw(content)))
    }

    const toJson = (editorState) => {
        const contentState = editorState.getCurrentContent();
        saveContent(contentState)
        setEditorState(editorState)
    }


    const createArticle = async () => {
        const a = JSON.parse(content)
         const newContent = a.blocks[0].text
        await auth.newArticle(token, category, summary, title, newContent)
    }
    {/* https://fatecspgov-my.sharepoint.com/:w:/r/personal/eduardo_vidal_fatec_sp_gov_br/Documents/Documents/Document1.docx?d=w83c17a93e1644401bc5001e4655fb769&csf=1&web=1&e=L8DgEj*/}

    return (
        <div className={styles.create}>
            <div className={styles.content}>
                <label>Categoria</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="songs">songs</option>
                    <option value="games">games</option>
                </select>
                <label htmlFor="">Titulo</label>
                <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Resumo</label>
                <input type="text" placeholder="Resumo" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <div className={styles.editor}>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={toJson}
                        placeholder="Escreva o seu artigo aqui!"
                    />
                </div>
                { }
                <button onClick={createArticle}>Enviar</button>
            </div>
        </div>
    )
}