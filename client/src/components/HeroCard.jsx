import styles from "./HeroCard.module.css";
import {useState} from "react";
import HeroFullInfo from "./HeroFullInfo";
import ModalWindow from "./UI/ModalWindow";

function HeroCard(props) {
    const [modalOpened, setModalOpened] = useState(false);

    function closeModal() {
        setModalOpened(false);
    }

    function openModal() {
        setModalOpened(true);
    }

    return (<>
        <div className={styles.card} onClick={openModal}>
            <img className={styles.image} src={props.hero.images[0]} alt={props.hero.nickname}/>
            <h1 className={styles.nickname}>{props.hero.nickname}</h1>
        </div>
        {modalOpened && <ModalWindow onClick={closeModal}>
            <HeroFullInfo closeWindow={closeModal} item={props.hero}/>
        </ModalWindow>}
    </>)
}

export default HeroCard;