import styles from "./Selector.module.css";

function Selector(props) {
    if (props.amount.length < 2) return;
    return <div className={styles["selectors-container"]}>
        {props.amount.map((image, index) => <button key={index}
            className={styles["small-selector"] + (props.counter === index ? ` ${styles.active}` : "")} onClick={() => {
            props.setCounter(index)
        }}/>)}
    </div>
}

export default Selector;

