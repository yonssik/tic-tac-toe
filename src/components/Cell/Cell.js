import styles from './Cell.module.css';

const cell = ({ click, children }) => {
    let cellStyles = styles.cell;

    return (
        <div className={cellStyles} onClick={click}>{children}</div>
    );
}

export default cell;