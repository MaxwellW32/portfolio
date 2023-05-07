"use client"

import styles from "./page.module.css"

import resume from "../../public/resumeUpdated.pdf";
import cert from "../../public/meta.pdf";

function Resume() {
  return (
    <div>
      <embed src={resume} className={styles.resumeStyle} type="application/pdf" />
      <embed src={cert} className={styles.resumeStyle} type="application/pdf" />
    </div>
  );
}

export default Resume;

