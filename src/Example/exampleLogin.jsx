import React, { useState } from 'react'
import axios from '../_helpers/axios';

export const ExampleLogin = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [isErr, setError] = useState(false);


    const changeUsername = (event) => {
        setusername(event.target.value);
    }

    const changePassword = (event) => {
        setpassword(event.target.value);
    }

    const submitData = () => {
        if (username && password) {
            console.log("success");
            setError(false);
            let user = {
                name: username,
                password: password
            };

            let a = axios.post("/simplelogin", user);
            console.log("a", a);
        }
        else {
            setError(true);
        }
    }

    return (
        <div>
            <input type="text" placeholder='Username' value={username} onChange={(e) => changeUsername(e)}>
            </input>
            <input type="password" placeholder='Password' value={password} onChange={(e) => changePassword(e)}>
            </input>
            <button onClick={submitData}>Submit</button>
            {isErr && <p> Please complete the form</p>}
        </div>
    )
}

