/* eslint-disable react/prop-types */
import React, { useContext, useState,  } from "react"
import { useSnackbar } from "./SnackBarContext"
import make_API_call from "../providers/make_API_call";
// import { errorMsg } from "../shared/components/Alerts"


const ArticlesContext = React.createContext()
const BASE_URL = 'https://wiki-service-c42xmwfnfa-uc.a.run.app/api'
const useArticlesContext = () => useContext(ArticlesContext);

 const ArticlesProvider = (props) =>  {
  const [articles, setArticles] = useState()
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar();

  const state = {
    articles,
    loading,
    showSnackbar,
  }
  const stateSetters = {
    setArticles,
    setLoading,
  
  }



  async function getArticles(categoryId) {
    try {
      setLoading(true);
      const data = await make_API_call("get", `${BASE_URL}/articles/${categoryId}`)
      console.log('sfdfd',data)
      setArticles(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
    
  }





  const services = {
    
    getArticles
  }
  return (
    <ArticlesContext.Provider value={{ state, stateSetters, services }}>
       {props.children}
    </ArticlesContext.Provider>
  )
}

const ArticlesContextProvider = (props) => <div key={Date.now()} ><ArticlesProvider>{props.children}</ArticlesProvider></div>


export { ArticlesContextProvider, useArticlesContext }