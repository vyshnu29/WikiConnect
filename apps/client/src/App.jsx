import {   useAuthContext,  } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import Loader from "./shared/components/Loader"
import { protectedRoutes, publicRoutes } from "./routes"
import { useEffect } from "react"
import { auth } from "./db"
import Navbar from "./layout/navbar"
import { CategoryContextProvider } from "./contexts/CategoryContext"


function App() {
  console.log("");
  const { state,stateSetters  } = useAuthContext()

  //Main page

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      stateSetters.setCurrentUser(user)
      stateSetters.setLoading(false)
    })

    return unsubscribe
  }, [])

  if (state.loading) {
    return <h1>Loading...</h1>
  }

  if (auth.currentUser?.uid) {
   //Included Navbar for header and providers for context
    return (
      <Navbar>
        <CategoryContextProvider>
        <Router>
        
        <Switch>
          {
            protectedRoutes?.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
          <Redirect to="/home" from="/" />
        </Switch>
      </Router>
      </CategoryContextProvider>
      </Navbar>
    )
  }

  return (
    <Router>
      <Switch>
        {
          publicRoutes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))
        }
        <Redirect to="/" from="*" />
      </Switch>
    </Router>
  )
}

export default App