import styles from "./HeroFullInfo.module.css";
import DescriptionSection from "./UI/DescriptionSection";
import NewHeroForm from "./NewHeroForm";
import {IoClose} from "react-icons/io5";
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {useContext, useState} from "react";
import Selector from "./UI/Selector";
import HeroesContext from "./Context/HeroesContextProvider";
import axios from "axios";

function HeroFullInfo(props) {
    const ctx = useContext(HeroesContext);
    const [editableState, setEditableState] = useState(false); // display edit form
    const [imageCounter, setImageCounter] = useState(0); // curr img counter
    const hero = props.item; // current hero data
    const images = hero?.images ?? [];

    function turnEdit() { // turn on or off edit form
        setEditableState((e) => !e);
    }

    function changeHero(data) { // triggers when hero is edited
        axios.patch("/superheroes/" + hero["_id"], data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                ctx.updateHeroes();
                ctx.resetCounter();
            })
            .catch(err => console.log(err));
    }

    function deleteHero() { // triggers on clicking on deletion button
        axios.delete("/superheroes/" + hero["_id"]).then(() => {
            ctx.updateHeroes();
            ctx.resetCounter();
        })
    }

    return (<>
        {!editableState && <>
            <div className={styles.container}>
                <div className={styles["img-container"]}>
                    <img className={styles.image} src={images[imageCounter]} alt={hero?.nickname}/>
                    <Selector counter={imageCounter} setCounter={(e) => setImageCounter(e)} amount={images}/>
                </div>
                <h1 className={styles.nickname + " " + styles.name}>{hero?.nickname}</h1>
                <h1 className={styles["real-name"] + " " + styles.name}>{hero?.real_name}</h1>
                <DescriptionSection title={"Superpowers"} content={hero?.superpowers} gridArea={"3/2/4/3"}/>
                <DescriptionSection title={"Catch Phrase"} content={'"' + hero?.catch_phrase + '"'}
                                    gridArea={"4/2/5/3"}/>
            </div>
            <DescriptionSection title={"Origin"} content={hero?.origin_description}/>
            <div className={styles.buttonsContainer}>
                <button className={styles["close-btn"] + " " + styles.btn}
                        onClick={editableState ? turnEdit : props.closeWindow}><IoClose/></button>
                <button className={styles.btn + " " + styles["edit-btn"]} onClick={turnEdit}><FaUserEdit/></button>
                <button className={styles.btn + " " + styles["del-btn"]} onClick={deleteHero}><FaTrashAlt/></button>
            </div>
        </>}
        {editableState && <NewHeroForm closeWindow={turnEdit} hero={hero} onSave={changeHero}/>}
    </>)
}

export default HeroFullInfo;