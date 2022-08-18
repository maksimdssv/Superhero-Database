import {createContext, useEffect, useState} from "react";
import ErrorWindow from "../UI/ErrorWindow";
import axios from "axios";

const HeroesContext = createContext({
    heroesArr: [],
    updateHeroes: () => {
    },
    loadingState: false,
    counter: 0,
    updateCounter: (e) => {
    },
    resetCounter: () => {
    },
    setError: (e) => {
    }
});

export function HeroesContextProvider(props) {
    const [heroes, setHeroes] = useState([]); // our heroes
    const [loadingState, setLoadingState] = useState(false); // true if loading smth
    const [counter, setCounter] = useState(0); // curr page
    const [error, setError] = useState(null); // error

    function updateHeroes() { // gets heroes from backend
        setLoadingState(true);
        axios.get("/superheroes/" + counter).then((res) => {
            (Promise.resolve(setHeroes(res.data)).then(() => setLoadingState(false)))
        }).catch(err => console.log(err))
    }

    function updateCounter(modifier) { // changes curr page
        setCounter((e) => e + modifier);
    }

    function resetCounter() { // reset page to 0
        setCounter(0);
    }

    function changeError(msg) { // change error msg
        setError(msg);
    }

    useEffect(updateHeroes, [counter]);

    return <HeroesContext.Provider
        value={{
            heroesArr: heroes,
            updateHeroes,
            loadingState,
            counter,
            updateCounter,
            resetCounter,
            setError: changeError
        }}>
        <>
            {error && <ErrorWindow msg={error} onClick={() => {
                setError(null)
            }}/>}
            {props.children}
        </>
    </HeroesContext.Provider>
}

export default HeroesContext;