/* eslint-disable react/prop-types */
import React, { useContext, useState,  } from "react"
import { useSnackbar } from "./SnackBarContext"
import make_API_call from "../providers/make_API_call";
// import { errorMsg } from "../shared/components/Alerts"


const CategoryContext = React.createContext()
const BASE_URL = 'https://wiki-service-c42xmwfnfa-uc.a.run.app/api'
const useCategoryContext = () => useContext(CategoryContext);

 const CategoryProvider = (props) =>  {
  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar();

  const state = {
    category,
    loading,
    showSnackbar,
  }
  const stateSetters = {
    setCategory,
    setLoading,
  
  }

 async function addNewCategory(payload) {
    return () => {
      make_API_call("post", `${BASE_URL}/category`, payload)
        .then((data) => {
          console.log(data)
          showSnackbar(data.message, 'success')
        })
        .catch((err) => {
            showSnackbar(err.message, 'error')
        })
    }
  }

  async function getCategory() {
    try {
      setLoading(true);
      const data = await make_API_call("get", `${BASE_URL}/category`);
      console.log('data',data)
      setCategory(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
  

  const services = {
    addNewCategory,
    getCategory
  }
  return (
    <CategoryContext.Provider value={{ state, stateSetters, services }}>
       {props.children}
    </CategoryContext.Provider>
  )
}

const CategoryContextProvider = (props) => <div key={Date.now()} ><CategoryProvider>{props.children}</CategoryProvider></div>


export { CategoryContextProvider, useCategoryContext }