import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { miscActions } from "../_Actions/miscactions";

export const ImageList = () => {

    const misc = useSelector(state => state.misc);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    //listing data
    useEffect(() => {
        if (auth.user) {
            let id = auth.user._id;
            dispatch(miscActions.imageList({ user_id: id }));
        }
    }, []);


    return (
        <div>ImageList</div>
    )
}
