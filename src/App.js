import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import PlantDetail from './components/PlantDetail'
import Header from './components/Header'

class App extends React.Component {
  state = {
    plants: []
  }



  render () {
    // console.log(process.env.REACT_APP_MY_API_KEY)
    if (!this.state.plants) return null
    
    return (
      <BrowserRouter>
        <Header />
        {/* <Navbar/> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:slug" component={PlantDetail} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
