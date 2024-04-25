"use client"
import React from "react";
import navStyles from "../ShoppingCart/ShoppingCart.module.css";
import { useState } from "react";
import Accordion from "@/components/Accordion";

const Orders = () => {
  const [accordions, setAccordion] = useState([ 
    { 
        key: 1, 
        title: 'What is GeeksforGeeks?', 
        data: `GeeksforGeeks is a one stop solution  
                  for all computer science students.`, 
        isOpen: false
    }, 
    { 
        key: 2, 
        title: 'What GeeksforGeeks offer us?', 
        data: `GeeksforGeeks offers Free Tutorials,  
                  Millions of Articles, Live, Online and  
                  Classroom Courses,Frequent Coding Competitions,  
                  Webinars by Industry Experts, Internship  
                  opportunities and Job Opportunities.`, 
        isOpen: false
    }, 
    { 
        key: 3, 
        title: 'Which is the best portal to study Computer Science?', 
        data: `GeeksforGeeks is the best Computer Science portal  
                  for geeks. It contains well written, well thought  
                  and well explained computer science and programming  
                  articles.`, 
        isOpen: false
    }, 
]); 

const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = accordions.map((accord) => { 
        if (accord.key === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAccordion(updatedAccordions); 
}; 
  return (
    <>
      <div className={navStyles.nav}></div>
      <div>
        <div className="p-2 m-8">
          {accordions.map((accordion) => (
            <Accordion
              key={accordion.key}
              title={accordion.title}
              data={accordion.data}
              isOpen={accordion.isOpen}
              toggleAccordion={() => toggleAccordion(accordion.key)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
