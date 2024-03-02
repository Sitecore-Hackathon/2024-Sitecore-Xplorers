import React from "react";
import styles from './style.module.css';

export default function LoaderSpinner() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.loadingSpinner}></div>
        </div>
    );
}