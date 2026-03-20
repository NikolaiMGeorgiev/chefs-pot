import "../styles/forms.css";
import "../styles/profile.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataLoader } from "./common/DataLoader";
import { HOST, HSOT_PORT } from "../config";
import ValidatedForm from "./common/ValidatedForm";
import InputWithLabel from "./common/InputWithLabel";
import type { ValidatedFormProps } from "../types/data";

export default function ProfileLoader() {
    const [data, setData] = useState({});
    
    return (
        <DataLoader setData={setData} url={`${HOST}:${HSOT_PORT}/api/profile`}>
            
        <div id="profile-form__container" className="centered-page__wrapper">
            <div className="form-container">
                <ValidatedForm
                    formId="profile-form"
                    initialData={data}
                    handleResponse={(f: undefined) => f}
                    Component={Profile}
                />
            </div>
        </div>
            
        </DataLoader>
    );
}


function Profile({ data, errors, onValueChange }: ValidatedFormProps) {
    const navigator = useNavigate();
    
    if (!data) {
        navigator("/login");
    }

    const handleLogout = () => {
        fetch(`${HOST}:${HSOT_PORT}/logout`, {
            method: "POST",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unsuccessful logout.")
                }
                navigator("/login");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <h1>Profile</h1>
            <div id="profile-form__data-container">
                <div id="profile-form__image-container">
                    <img id="profile-img" src="/images/avatar.png" />
                    <button id="avatar-btn" type="button" className="button">Change avatar</button>
                </div>
                <div id="profile-form__input-container">
                    <InputWithLabel 
                        name="username"
                        value={data.username}
                        labelText="Username"
                        errorText={errors.username}
                        onValueChange={onValueChange}
                    />
                    <InputWithLabel 
                        name="email"
                        type="email"
                        value={data.email}
                        labelText="Email"
                        errorText={errors.email}
                        onValueChange={onValueChange}
                    />
                </div>
            </div>
            <div className="form-buttons-container">
                <button className="button" type="submit">Save Changes</button>
                <button id="logout-btn" className="button" onClick={handleLogout} type="button">Log Out</button>
            </div>
        </>
        
    )
}