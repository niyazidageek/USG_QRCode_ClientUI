import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../redux/actions/authActions";

export function useValidateToken(){

    const dispatch = useDispatch();

    let expiryDate = useSelector((state:any)=>state.authReducer.jwtExpiryDate);

    useEffect(()=>{
        expiryDate = Date.parse(expiryDate);
        let currentDate = new Date;
        if(expiryDate<currentDate.getTime()){
            dispatch(logOutAction());
        }
    });
}