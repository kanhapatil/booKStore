import React, { useEffect } from "react";
import axios from "axios";
import { useFilter } from "../Context";

const TopStoreFetcher = ({ setStores }) => {
  const { filterCity } = useFilter();

  console.log(filterCity);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `http://127.0.0.1:8000/store/mystore/?search=${filterCity}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStores(response.data);
        } else {
          const response = await axios.get(
            `http://127.0.0.1:8000/store/mystore/?search=${filterCity}`
          );
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchStores();
  }, [setStores, filterCity]);

  return null;
};

export default TopStoreFetcher;
