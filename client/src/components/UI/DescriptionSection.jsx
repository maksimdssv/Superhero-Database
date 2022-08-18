import styles from "./DescriptionSection.module.css";

function DescriptionSection(props) {
    const customStyles = {
        gridArea: props.gridArea
    }

    return (<div className={styles.container} style={customStyles}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.description}>{props.content}</p>
    </div>)
}

export default DescriptionSection;