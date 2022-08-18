import styles from "./ErrorWindow.module.css";
import {createPortal} from "react-dom";

function ErrorWindow(props) {
    const root = document.getElementById("error-root");

    return createPortal(
        <div className={styles.backdrop}>
            <div className={styles.container}>
                <header className={styles.error}>Error</header>
                <p className={styles.text}>{props.msg}</p>
                <button className={styles.btn} onClick={props.onClick}>OK</button>
            </div>
        </div>
        , root)
}

export default ErrorWindow;