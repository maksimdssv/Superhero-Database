import styles from './Input.module.css';

function Input(props) {
    const type = props.type;
    return (<>
        <label htmlFor={props.label} className={styles.label}>
            {props.label}
        </label>
        {type === "text" &&
            <input className={styles.input} type={props.type} id={props.label} placeholder={props.placeholder}
                   defaultValue={props.value}/>}
        {type === "textarea" &&
            <textarea maxLength={200} defaultValue={props.value} id={props.label}
                      className={styles.input + " " + styles.textarea}/>
        }
    </>)
}

export default Input;