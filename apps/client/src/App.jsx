import {   useAuthContext,  } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import Loader from "./shared/components/Loader"
import { protectedRoutes, publicRoutes } from "./routes"
import { useEffect } from "react"
import { auth } from "./db"
import Navbar from "./layout/navbar"


function App() {
  const { state,stateSetters  } = useAuthContext()

 

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
   
    return (
      <Navbar>
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