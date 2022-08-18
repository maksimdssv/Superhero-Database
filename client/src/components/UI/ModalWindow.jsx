import styles from "./ModalWindow.module.css";
import {createPortal} from "react-dom";
import Backdrop from "./Backdrop";

function ModalWindow(props){
    const backdropRoot = document.getElementById("backdrop-root");
    const modalRoot = document.getElementById("modal-root");
    return (<>
        {createPortal(<Backdrop onClick={props.onClick}/>, backdropRoot)}
        {createPortal(<div className={styles.container}>
            {props.children}
        </div>, modalRoot)}
    </>)
}

export default ModalWindow;