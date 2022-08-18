import {FcSportsMode} from "react-icons/fc";
import {HeroesContextProvider} from "./components/Context/HeroesContextProvider";
import styles from './App.module.css';

import HeroesFeed from "./components/HeroesFeed";

function App() {

    return (
        <div className={styles.app}>
            <header className={styles["main-header"]}>
                <FcSportsMode className={styles.icon}/>
                <p >Welcome to Superhero Database</p>
            </header>
            <HeroesContextProvider>
                <HeroesFeed/>
            </HeroesContextProvider>
        </div>
    );
}

export default App;
