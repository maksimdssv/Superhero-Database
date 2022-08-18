import styles from "./NewHeroFrom.module.css";
import Input from "./UI/Input";
import Selector from "./UI/Selector";
import {useContext, useRef, useState} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import HeroesContext from "./Context/HeroesContextProvider";

function NewHeroForm(props) {
    const initialHero = props.hero;

    const ctx = useContext(HeroesContext);
    const [imageCounter, setImageCounter] = useState(0); // index of displayed image
    const [images, setImages] = useState(initialHero?.images ?? []); // state for images

    const imgSelectRef = useRef(); // ref for our img input
    const divRef = useRef(); // ref for whole div

    function deleteImg() { // delete curr image
        setImages((oldImgs) => oldImgs.filter((img, index) => index !== imageCounter));
        setImageCounter((e) => e - 1 !== -1 ? e - 1 : 0);
        imgSelectRef.current.value = "";
    }

    async function makeURL(file) { // making url out of file
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    }

    async function addImg(evt) { // function to handle img input
        if (evt.target.files[0] !== undefined) {
            if (!evt.target.files[0].type.includes("image/")) { // check for file type
                ctx.setError("Please, provide a valid image");
                return
            }
            try {
                const newImage = await makeURL(evt.target.files[0]);
                setImages((e) => [newImage, ...e])
                setImageCounter(0);
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function saveData() { // get data from all inputs and pass to props func
        const nickname = divRef.current.children[3].value.trim(); // Nickname
        let error = "";
        if (nickname.length === 0) { // check if nickname is empty
            error += "Please, provide a nickname for your hero! "
        }
        const reg = /\W/;
        if (reg.test(nickname) && nickname.length !== 0) { // check for invalid symbols
            error += "Please, provide a valid nickname without symbols for your hero! "
        }
        if (images.length === 0) { // check for no images
            error += "Please, provide at least one image for your hero!"
        }
        if (error.length > 0) { // break execution
            ctx.setError(error);
            return;
        }

        const newImages = await Promise.all(images.map(dataURL => fetch(dataURL).then(res => res.arrayBuffer())
            .then((res) => new File([res], "fileName", {type: "image/jpeg"}))));
        // transfer image from dataURL to file by fetching it

        const realName = divRef.current.children[5].value; // Real Name
        const superpowers = divRef.current.children[7].value; // Superpowers
        const catchPhrase = divRef.current.children[9].value; // Catch Phrase
        const origin = divRef.current.children[11].value; // Origin Description
        const newData = {
            nickname, realName, superpowers, catchPhrase, origin, images: newImages
        }
        props.onSave(newData); // send data to props func
        props.closeWindow();
    }

    return <div className={styles.container} ref={divRef}>
        <div className={styles["image-container"]}>
            {images.length > 0 && <img src={images[imageCounter]} alt={initialHero?.nickname ?? "hero"}/>}
            {images.length === 0 && <p>Please, add an image to proceed</p>}
            <Selector counter={imageCounter} setCounter={(e) => setImageCounter(e)}
                      amount={images}/>
            <div className={styles["buttons-container"]}>
                {images.length < 5 && <button className={styles.btn + " " + styles["add-btn"]} onClick={() => {
                    imgSelectRef.current.click()
                }}>Add Image
                </button>}
                {images.length > 0 &&
                    <button className={styles.btn + " " + styles["del-btn"]} onClick={deleteImg}><FaRegTrashAlt/>
                    </button>}
            </div>

        </div>

        <input type={"file"} hidden={true} ref={imgSelectRef} accept="image/*" onChange={addImg}/>

        <Input type={"text"} value={initialHero?.nickname} label={"Nickname"}/>
        <Input type={"text"} value={initialHero?.real_name} label={"Real Name"}/>
        <Input type={"textarea"} value={initialHero?.superpowers} label={"Superpowers"}/>
        <Input type={"textarea"} value={initialHero?.catch_phrase} label={"Catch Phrase"}/>
        <Input type={"textarea"} value={initialHero?.origin_description} label={"Origin"}/>
        <div className={`${styles["buttons-container"]} ${styles["end-btns-container"]}`}>
            <button onClick={props.closeWindow} className={styles.btn + " " + styles["del-btn"]}>Cancel</button>
            <button onClick={saveData} className={styles.btn + " " + styles["add-btn"]}>Save</button>
        </div>
    </div>
}

export default NewHeroForm;