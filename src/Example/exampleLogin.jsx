import React, { useRef, useReducer } from 'react'
import { Button } from 'react-bootstrap';

export const ExampleLogin = () => {

   const fileinput = useRef();
    const initialstate = {
        name: "",
        password: "",
    }
    const reducer = (state, action) => {
        console.log(state, "state");
        console.log(action, "action");

        switch (action.type) {
            case "name": {
                return {
                    ...state,
                    [action.name]: action.value
                }
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialstate);

    const changeButton = () => {
        fileinput.current.click();
    }
    return (
        <div>

            <input type="text" placeholder='Password' value={state.name}
                onChange={(e) => dispatch({ type: "name", name: "name", value: e.target.value })}>
            </input>
            <input ref={fileinput} type="file" placeholder='Password' value=""></input>
            <Button onClick={changeButton}>submit</Button>
        </div>
    )
}

