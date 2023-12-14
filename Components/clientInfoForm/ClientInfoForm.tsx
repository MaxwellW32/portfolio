"use client"

import React, { useState } from 'react'
import { clientForm } from '../../types'
import styles from "./clientinfoform.module.css"
import ImageTwoColumn from '../imageTwoColumn/ImageTwoColumn'

const FormInput = ({ label, id, name, value, onChange, placeholder, type }: { label?: string, id: string, name: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder: string, type: React.HTMLInputTypeAttribute }) => (
    <>
        {/* Use optional chaining to check if label exists */}
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
            <h3>{sectionTitle}</h3>
            {//@ts-ignore
                Object.keys(formObj[sectionName]).map((eachKey) => {
                    let myLabel = ""
                    let myType = "text"
                    let myPlaceholder = eachKey

                    let newtest = eachKey.replace(/([a-z])([A-Z])/g, '$1 $2');

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
                            placeholder={newtest}
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
            companyName: "",
            email: "",
            phoneNumber: ""
        },
        businessGoals: {
            businessDescription: "",
            mission: "",
            goals: ""
        },
        targetAudience: {
            ageGroup: "",
            location: "",
            interests: ""
        },
        designPreferences: {
            designStyle: "",
            colorPreferences: "",
            existingMaterials: ""
        },
        content: {
            providingContent: false,
            preferredContentTypes: "",
            requiredFeatures: ""
        },
        websiteStucture: {
            siteStucture: "",
            specifcPagesWanted: ""
        },
        project: {
            preferredCMS: "",
            hostingPreferences: "",
            projectTimeline: "",
            budgetConstraints: ""
        },
        additionalNotes: {
            additionalInfo: "",
            reviewExpectation: ""
        },
        maintenance: {
            onGoingSupportNeeded: ""
        }
    }


    const [formObj, formObjSet] = useState({ ...initialFormObj })
    const [pagesArr, pagesArrSet] = useState(new Array(5).fill(""))
    const [activePageIndex, activePageIndexSet] = useState(0)

    return (
        <div style={{ height: "100%", display: "grid", gridTemplateRows: "1fr auto", position: "relative" }}>
            <form style={{ overflow: "hidden" }} className={styles.mainForm}>
                <div style={{ display: "grid", gridAutoFlow: "column", gridTemplateColumns: `repeat(${pagesArr.length}, min(20px, ${100 / pagesArr.length}))`, justifyContent: "center", gap: ".5rem", padding: ".5rem" }}>
                    {pagesArr.map((eachItem, eachItemIndex) => {
                        return (
                            <svg key={eachItemIndex} onClick={() => { activePageIndexSet(eachItemIndex) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                {activePageIndex === eachItemIndex ? (
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />) : (
                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                )}
                            </svg>
                        )
                    })}
                </div>

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
                            height: "640px"
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
                            flexDirection: "row-reverse"
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

                <section style={{ display: activePageIndex !== 4 ? "none" : "" }}>
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
                            flexDirection: "row-reverse"
                        }}
                    />
                </section>
            </form>

            <div style={{ position: "fixed", bottom: 0, left: 0, display: "flex", justifyContent: "center", gap: "1rem", width: "100%", backgroundColor: "rgb(var(--whiteSwitch))" }}>
                <button role='button' onClick={() => {
                    activePageIndexSet(prev => {
                        let newIndex = prev - 1
                        if (newIndex < 0) {
                            newIndex = pagesArr.length - 1
                        }

                        return newIndex
                    })
                }}>prev section</button>

                <button onClick={() => {
                    activePageIndexSet(prev => {
                        let newIndex = prev + 1
                        if (newIndex > pagesArr.length - 1) {
                            newIndex = 0
                        }

                        return newIndex
                    })
                }}>next section</button>
            </div>
        </div>
    )
}

