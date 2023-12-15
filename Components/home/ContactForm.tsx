"use client"
import { useState } from "react";
import styles from '../../app/page.module.css'
import emailjs from "@emailjs/browser";

export default function ContactForm() {

    const initialFormState = {
        cxName: "",
        cxNameIsValid: true,

        cxPhoneNumber: "",
        cxPhoneNumberIsValid: true,

        cxEmail: "",
        cxEmailIsValid: true,

        cxMessage: "",
        cxMessageIsValid: true,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formTouched, setFormTouched] = useState(false);
    const [canShowModal, setCanShowModal] = useState({
        modalShowing: false,
        sentSuccess: false,
        statusMessage: "",
    });

    function handleForm(field: string, e: any) {
        if (field === "nameInput") {
            setFormData((prevData) => {
                let nameValid =
                    prevData.cxName.length >= 2 && prevData.cxName.length <= 49;

                return {
                    ...prevData,
                    cxName: e.target.value,
                    cxNameIsValid: nameValid,
                };
            });
        } else if (field === "phoneInput") {
            setFormData((prevData) => {
                const phoneNumberPattern = /^[\d\-\(\)\s]+$/;
                let numberValid =
                    prevData.cxPhoneNumber.length <= 15 &&
                    phoneNumberPattern.test(e.target.value);

                if (prevData.cxPhoneNumber.length <= 1) {
                    numberValid = true;
                }
                return {
                    ...prevData,
                    cxPhoneNumber: e.target.value,
                    cxPhoneNumberIsValid: numberValid,
                };
            });
        } else if (field === "emailInput") {
            setFormData((prevData) => {
                let validEmail =
                    prevData.cxEmail.length > 1 && e.target.value.includes("@");
                return {
                    ...prevData,
                    cxEmail: e.target.value,
                    cxEmailIsValid: validEmail,
                };
            });
        } else if (field === "messageInput") {
            setFormData((prevData) => {
                let validMessage = prevData.cxMessage.length > 1;

                return {
                    ...prevData,
                    cxMessage: e.target.value,
                    cxMessageIsValid: validMessage,
                };
            });
        }
    }

    async function handleSubmit(e: any) {

        e.preventDefault();

        emailjs
            .sendForm(
                `service_i29q1eu`,
                `template_u4dq9ge`,
                e.target,
                `rKzfrKZJI8d6o86V-`
            )
            .then(
                function (response) {
                    if (
                        response.status === 200 ||
                        response.status === 202 ||
                        response.status === 204
                    ) {
                        setCanShowModal((prevData) => {
                            return {
                                ...prevData,
                                modalShowing: true,
                                sentSuccess: true,
                                statusMessage: `All Good signal code ${response.status}`,
                            };
                        });

                        setFormData(initialFormState);
                        setFormTouched(false);
                    }
                },
                function (error) {
                    setCanShowModal((prevData) => {
                        return {
                            ...prevData,
                            modalShowing: true,
                            sentSuccess: false,
                            statusMessage: error,
                        };
                    });
                }
            );

    }


    return (
        <>
            <h1 className={styles.BigHeader}>Contact Us</h1>
            <p>Got any questions? Feel free to reach out.</p>
            <article className={styles.contactSecCont}>
                <div>
                    <p className={styles.contactSecHeading}>Our address</p>
                    <ul>
                        <li className={styles.contactSecLi}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                            <p>
                                100 Biscayne Blvd. (North) 21st Floor New World Tower
                                Kingston, Jamaica 33148
                            </p>
                        </li>
                        <li className={styles.contactSecLi}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                            </svg>{" "}
                            <p>(876) 555-4446</p>
                        </li>
                        <li className={styles.contactSecLi}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>{" "}
                            <p>maxwell@maxdevdesign.com</p>
                        </li>
                        <li className={styles.contactSecLi}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                            </svg>{" "}
                            <p>www.maxreactbuilder.com</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className={styles.contactSecHeading}>Drop us a line</p>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className={styles.contactFormGridCont}>
                            <input
                                id="cxName"
                                name="cxName"
                                placeholder="Name"
                                type="text"
                                onChange={(e) => {
                                    handleForm("nameInput", e);
                                }}
                                required
                                className={
                                    formTouched
                                        ? formData.cxNameIsValid
                                            ? styles.inputValid
                                            : styles.inputInValid
                                        : undefined
                                }
                                value={formData.cxName}
                                onBlur={() => {
                                    setFormTouched(true);
                                }}
                            />
                            <input
                                id="cxEmail"
                                name="cxEmail"
                                placeholder="E-Mail"
                                type="email"
                                onChange={(e) => {
                                    handleForm("emailInput", e);
                                }}
                                required
                                value={formData.cxEmail}
                                onBlur={() => {
                                    setFormTouched(true);
                                }}
                                className={
                                    formTouched
                                        ? formData.cxEmailIsValid
                                            ? styles.inputValid
                                            : styles.inputInValid
                                        : undefined
                                }
                            />
                            <input
                                id="cxTel"
                                name="cxTel"
                                placeholder="Phone"
                                type="tel"
                                onChange={(e) => {
                                    handleForm("phoneInput", e);
                                }}
                                value={formData.cxPhoneNumber}
                                onBlur={() => {
                                    setFormTouched(true);
                                }}
                                className={
                                    formData.cxPhoneNumber.length > 1 && formTouched
                                        ? formData.cxPhoneNumberIsValid
                                            ? styles.inputValid
                                            : styles.inputInValid
                                        : undefined
                                }
                            />
                            <textarea
                                style={{ wordWrap: "break-word" }}
                                id="cxMessage"
                                name="cxMessage"
                                placeholder="Message"
                                onChange={(e) => {
                                    handleForm("messageInput", e);
                                }}
                                required
                                value={formData.cxMessage}
                                onBlur={() => {
                                    setFormTouched(true);
                                }}
                                className={
                                    formTouched
                                        ? formData.cxMessageIsValid
                                            ? styles.inputValid
                                            : styles.inputInValid
                                        : undefined
                                }
                            />
                        </div>

                        <button
                            disabled={
                                formData.cxNameIsValid &&
                                    formData.cxEmailIsValid &&
                                    formData.cxMessageIsValid
                                    ? false
                                    : true
                            }
                            className={
                                formData.cxNameIsValid &&
                                    formData.cxEmailIsValid &&
                                    formData.cxPhoneNumberIsValid &&
                                    formData.cxMessageIsValid
                                    ? styles.mainBttn
                                    : styles.invalidButton
                            }
                            type="submit"
                        >
                            send
                        </button>
                    </form>
                </div>
            </article>
            {canShowModal.modalShowing && (
                <div className={styles.sentModal}>
                    <svg
                        style={{
                            "--customColor": canShowModal.sentSuccess
                                ? "0, 112, 0"
                                : "112, 0, 0",
                        } as React.CSSProperties}
                        onClick={() => {
                            setCanShowModal((prevData) => {
                                return { ...prevData, modalShowing: false };
                            });
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>

                    {canShowModal.sentSuccess ? (
                        <div>
                            <p>Message Sent Successfully</p>
                            <p>{canShowModal.statusMessage}</p>
                        </div>
                    ) : (
                        <div>
                            <p>Message Not Sent</p>
                            <p>{canShowModal.statusMessage}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}