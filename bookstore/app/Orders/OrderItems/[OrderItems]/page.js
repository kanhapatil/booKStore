"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const page = () => {
  const id = useParams();
  const [orderItems, setOrderItems] = useState();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/order/myorderitem/?order_id=${id.OrderItems}`);
        setOrderItems(response.data);
      }catch(error){
        console.log("Something went wrong");
      }
    };

    fetchOrderItems();
  },[])

  if(orderItems){
    console.log(orderItems);
  }

  return (
    <>
      <div className="navbar"></div>
    </>
  )
}

export default page
