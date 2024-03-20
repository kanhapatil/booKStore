"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LogInImg from "@/components/LogInImg";

const Profile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const address = async () => {
            const response = await axios.get("http://127.0.0.1:8000/user/address/");
            console.log(response.data);
        }

        address();
    },[])
  return (
    <>
    <LogInImg />
    </>
  )
}

export default Profile
