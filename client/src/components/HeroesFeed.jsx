import styles from "./HeroesFeed.module.css";
import {FiUserPlus} from "react-icons/fi";
import HeroCard from "./HeroCard";
import {GiSadCrab} from "react-icons/gi";
import {BsArrowDown} from "react-icons/bs";
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";
import {useContext, useState} from "react";
import HeroesContext from "./Context/HeroesContextProvider";
import ModalWindow from "./UI/ModalWindow";
import NewHeroForm from "./NewHeroForm";
import axios from "axios";

function HeroesFeed() {
    const [makeHeroModal, setMakeHeroModal] = useState(false); // modal state
    const ctx = useContext(HeroesContext);
    const heroesArr = ctx.heroesArr;

    function turnHeroModal() { // handle modalWindow
        setMakeHeroModal((e) => !e);
    }

    async function addHero(data) { // handle click "save" in modal
        axios.post("/superheroes", data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                ctx.updateHeroes();
                ctx.resetCounter();
            })
            .catch(err => console.log(err));
    }

    return (<div className={styles.container}>
        <h1 className={styles.greeting}>Take a look at our heroes</h1>
        <div className={styles["cards-container"]}>
            {heroesArr.length > 0 && !ctx.loadingState && heroesArr.map((hero) => <HeroCard
                key={hero["_id"]} hero={hero}/>)}
            {heroesArr.length === 0 && !ctx.loadingState &&
                <p className={styles["empty-err"]}>It seems there are no heroes yet<br/><span><GiSadCrab/></span><br/>Try
                    adding them with button below<br/><span><BsArrowDown/></span></p>}
            {ctx.loadingState &&
                <p className={styles["empty-err"] + " " + styles["loading"]}>Loading<span>...</span></p>}
        </div>
        {!ctx.loadingState && <div className={styles["btn-container"]}>
            {ctx.counter > 0 && <button className={styles['add-btn']} onClick={() => {
                ctx.updateCounter(-1)
            }}><FaArrowLeft/></button>}
            <button className={styles['add-btn']} title="Add new Hero to the list" onClick={turnHeroModal}><FiUserPlus/>
            </button>
            {ctx.heroesArr.length === 5 && <button className={styles['add-btn']} onClick={() => {
                ctx.updateCounter(1)
            }}><FaArrowRight/></button>}
        </div>}

        {makeHeroModal && <ModalWindow closeWindow={turnHeroModal}>
            <NewHeroForm onSave={addHero} closeWindow={turnHeroModal}/>
        </ModalWindow>}
    </div>)
}

export default HeroesFeed;