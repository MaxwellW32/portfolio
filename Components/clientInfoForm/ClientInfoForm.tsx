"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { clientForm, clientFormScheme } from '../../types'
import styles from "./clientinfoform.module.css"
import ImageTwoColumn from '../imageTwoColumn/ImageTwoColumn'
import emailjs from "@emailjs/browser";
import { retreiveFromLocalStorage, saveToLocalStorage } from '../../utility/savestorage'
import { toast } from 'react-hot-toast'
import { useAtom } from 'jotai'
import { globalTheme } from '../../utility/globalState'

const FormInput = ({ label, id, name, value, onChange, placeholder, type }: { label?: string, id: string, name: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder: string, type: React.HTMLInputTypeAttribute }) => (
    <>
        {label && <label htmlFor={id}>{label}</label>}
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </>
);

const YourFormComponent = ({ formObj, formObjSet, sectionName, sectionTitle }: { formObj: clientForm, formObjSet: React.Dispatch<React.SetStateAction<clientForm>>, sectionName: string, sectionTitle: string }) => {
    return (
        <div className={`${styles.formSection} noScrollbar`}>
            <h2 style={{ paddingTop: sectionName === "basicInfo" ? 0 : "" }}>{sectionTitle}</h2>
            {//@ts-ignore
                Object.keys(formObj[sectionName]).map((eachKey) => {
                    let myType = "text"

                    let myPlaceholder = eachKey.replace(/([a-z])([A-Z])/g, '$1 $2');
                    let myLabel = myPlaceholder

                    //replace by section
                    if (sectionName === "basicInfo") {
                        myLabel = ""
                    }

                    //replace specific
                    if (eachKey === "clientName") {
                        myPlaceholder = "What is your name?"
                    }
                    return (
                        <FormInput
                            key={eachKey}
                            label={myLabel}
                            type={myType}
                            id={`${eachKey}Input`}
                            name={eachKey}
                            //@ts-ignore
                            value={formObj[sectionName][eachKey]}
                            onChange={(e) => {
                                formObjSet((prevObj) => {
                                    //@ts-ignore
                                    prevObj[sectionName][eachKey] = e.target.value;
                                    return { ...prevObj };
                                });
                            }}
                            placeholder={myPlaceholder}
                        />
                    )
                })}
        </div>
    );
};

export default function ClientInfoForm() {

    const initialFormObj: clientForm = {
        basicInfo: {
            clientName: "",
            companyName: "ABC Company",
            email: "john.doe@example.com",
            phoneNumber: "+1 555-123-4567",
        },
        businessGoals: {
            businessDescription: "",
            mission: "To exceed customer expectations and deliver quality.",
            goals: "Expand market reach, improve customer satisfaction.",
        },
        targetAudience: {
            ageGroup: "25-55",
            location: "United States",
            interests: "Technology, Lifestyle, Travel",
        },
        designPreferences: {
            designStyle: "Modern and Clean",
            colorPreferences: "Blue and White",
            existingMaterials: "Logo and branding materials attached.",
        },
        content: {
            providingContent: "Please past any Url's you'd like to use - Drive/DropBox/Figma",
            preferredContentTypes: "Blog articles, Videos, Infographics",
            requiredFeatures: "Contact form, Image gallery",
        },
        websiteStucture: {
            siteStucture: "Homepage, About Us, Services, Contact",
            specifcPagesWanted: "Product Catalog, Testimonials",
        },
        project: {
            preferredCMS: "WordPress",
            hostingPreferences: "Vercel / AWS / HostGator / C-Panel / Plesk",
            projectTimeline: "3 months",
            budgetConstraints: "$10,000 - $15,000 JMD",
        },
        additionalNotes: {
            additionalInfo: "Looking for a modern and user-friendly design.",
            reviewExpectation: "Expecting weekly project updates.",
        },
        maintenance: {
            onGoingSupportNeeded: "Yes, regular updates and support required.",
        },
    };


    const [formObj, formObjSet] = useState({ ...initialFormObj })
    const [pagesArr, pagesArrSet] = useState(new Array(5).fill(""))
    const [activePageIndex, activePageIndexSet] = useState(0)
    const [triedFetchOld, triedFetchOldSet] = useState(false)
    const [theme] = useAtom(globalTheme)
    //try reading old form obj from storage
    useEffect(() => {
        const seenFormObj = retreiveFromLocalStorage("formObj")

        if (seenFormObj !== null) {
            formObjSet(seenFormObj)
        }
        triedFetchOldSet(true)
    }, [])

    //save changes to storage
    useEffect(() => {
        if (triedFetchOld) {
            saveToLocalStorage("formObj", formObj)
        }
    }, [formObj, triedFetchOld])

    const handleSubmit = async (formSubmitEvent: FormEvent<HTMLFormElement>) => {
        formSubmitEvent.preventDefault();
        if (!clientFormScheme.safeParse(formObj).success) return toast.error("Form not valid")

        const seenFormEl = formSubmitEvent.target as HTMLFormElement

        const result = await emailjs
            .sendForm(
                `service_aqysduz`,
                `template_bq82am9`,
                seenFormEl,
                `-s3Tdsinabq9-db-S`
            )

        if ((result.status >= 200 && result.status < 300) || result.text === "OK") {
            console.log(`$success mans`, result);
            toast.success("Sent!")
            formObjSet({ ...initialFormObj })
        } else {
            toast.error("Couldn't send")
            console.log(`$seomething else happened`, result);
        }
    }

    return (
        <div style={{ height: "100%", display: "grid", gridTemplateRows: "1fr auto", position: "relative", paddingBottom: "5rem", backgroundColor: "rgb(var(--formColorMain))" }}>
            <div style={{ position: "fixed", top: 0, backgroundColor: "rgb(var(--formColorMain))", borderBottom: theme ? "1px solid #000" : "1px solid #fff", width: "100%", paddingTop: "3rem", display: "flex", gap: "1rem", zIndex: 1, alignItems: "center", justifyContent: "center" }}>
                <button style={{ backgroundColor: "rgb(var(--mainColor))", padding: ".7rem 2rem" }} role='button' onClick={() => {
                    activePageIndexSet(prev => {
                        let newIndex = prev - 1
                        if (newIndex < 0) {
                            newIndex = pagesArr.length - 1
                        }

                        return newIndex
                    })
                }}>back</button>

                <div style={{ display: "grid", gridAutoFlow: "column", gridTemplateColumns: `repeat(${pagesArr.length}, min(20px, ${100 / pagesArr.length}%))`, justifyContent: "center", gap: ".5rem", padding: ".5rem", fill: "rgb(var(--blackSwitch))" }}>
                    {pagesArr.map((eachItem, eachItemIndex) => {
                        return (
                            <svg key={eachItemIndex} onClick={() => {
                                activePageIndexSet(eachItemIndex)
                                window.scrollTo(0, 0)

                            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                {activePageIndex === eachItemIndex ? (
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />) : (
                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                )}
                            </svg>
                        )
                    })}
                </div>

                <button style={{ backgroundColor: "rgb(var(--mainColor))", padding: ".7rem 2rem" }} onClick={() => {
                    activePageIndexSet(prev => {
                        let newIndex = prev + 1
                        if (newIndex > pagesArr.length - 1) {
                            newIndex = 0
                        }

                        return newIndex
                    })
                }}>next</button>
            </div>

            <form method='POST' onSubmit={handleSubmit} style={{ overflow: "hidden" }} className={styles.mainForm}>

                <button style={{ backgroundColor: "rgb(var(--mainColor))", justifySelf: "center", paddingInline: "2rem" }} onClick={() => {
                }}>submit</button>


                <section style={{ display: activePageIndex !== 0 ? "none" : "", }}>
                    <ImageTwoColumn
                        imageProps={{
                            style: {
                                height: "100%"
                            }
                        }}
                        imageOptions={{ alt: "", src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                        secondEl={
                            <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"basicInfo"} sectionTitle='Registration Info' />
                        }

                        style={{
                            rowGap: "1rem"
                        }}
                    />
                </section>

                <section style={{ display: activePageIndex !== 1 ? "none" : "" }}>
                    <ImageTwoColumn
                        imageProps={{
                            style: {
                                height: "100%"
                            }
                        }}
                        imageOptions={{ alt: "", src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                        secondEl={
                            <div className={`${styles.formSection} noScrollbar`}>
                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"businessGoals"} sectionTitle='Business Goals' />


                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"targetAudience"} sectionTitle='Target Audience' />
                            </div>
                        }

                        style={{
                            flexDirection: "row-reverse",
                        }}
                    />
                </section>

                <section style={{ display: activePageIndex !== 2 ? "none" : "" }}>
                    <ImageTwoColumn
                        imageProps={{
                            style: {
                                height: "100%"
                            }
                        }}
                        imageOptions={{ alt: "", src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                        secondEl={
                            <div className={`${styles.formSection} noScrollbar`}>
                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"designPreferences"} sectionTitle='Design Preferences' />

                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"content"} sectionTitle='Content' />
                            </div>
                        }

                        style={{
                            flexDirection: "row-reverse",
                        }}
                    />
                </section>

                <section style={{ display: activePageIndex !== 3 ? "none" : "" }}>
                    <ImageTwoColumn
                        imageProps={{
                            style: {
                                height: "100%"
                            }
                        }}
                        imageOptions={{ alt: "", src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                        secondEl={
                            <div className={`${styles.formSection} noScrollbar`}>
                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"websiteStucture"} sectionTitle='Website Stucture' />

                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"project"} sectionTitle='Project' />

                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"additionalNotes"} sectionTitle='Additional Notes' />
                            </div>
                        }

                        style={{
                        }}
                    />
                </section>

                <section style={{ display: activePageIndex !== 4 ? "none" : "", height: "auto" }}>
                    <ImageTwoColumn
                        imageProps={{
                            style: {
                                height: "100%"
                            }
                        }}
                        imageOptions={{ alt: "", src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
                        secondEl={
                            <div className={`${styles.formSection} noScrollbar`}>
                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"websiteStucture"} sectionTitle='Website Stucture' />

                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"additionalNotes"} sectionTitle='Additional Notes' />

                                <YourFormComponent formObj={formObj} formObjSet={formObjSet} sectionName={"maintenance"} sectionTitle='Longterm Support Needed' />
                            </div>
                        }

                        style={{
                            flexDirection: "row-reverse",
                        }}
                    />
                </section>
            </form>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", width: "100%" }}>

            </div>
        </div >
    )
}

