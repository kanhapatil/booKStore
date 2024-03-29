import React, { useEffect } from "react";
import axios from "axios";

const TopStoreFetcher = ({ setStores }) => {
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:8000/store/mystore/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStores(response.data);
        } else {
          const response = await axios.get(
            "http://127.0.0.1:8000/store/mystore/"
          );
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchStores();
  }, [setStores]);

  return null;
};

export default TopStoreFetcher;
