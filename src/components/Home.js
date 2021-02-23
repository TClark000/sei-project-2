import React from 'react'

import { getPlantsEdible, getPlantsEdibleQueryTwo } from '../lib/api'
import PlantCard from './PlantCard'
import SearchPlant from './SearchPlant'

class Home extends React.Component {

  state  = {
    plants: [],
    search: [],
    searchQuery: '',
    links: null,
    corsdemo: ''
  }

  filterPlants = async(event) => {
    // console.log(event.target.value)
    try {
      const searchQuery = event.target.value
      const response = await getPlantsEdibleQueryTwo(searchQuery)
      if (response) {
        const plants = response.data.data
        const links = response.data.links
        console.log(response, response.data, links)
        this.setState({ plants, searchQuery, links })
      }
    } catch (err) {
      console.log(err)
    }
  }

  CallEdiblePlant = async (pageNum) => {
    try {
      let response = await getPlantsEdible(pageNum).catch(err => {
        if ((err.response.status === 403) && (err.response.data.includes('corsdemo'))) {
          const corsdemo = 'Prior to running this app enable CORS Anywhere, by completing the challenge on the site:'
          this.setState({ corsdemo })
          response = []
        }
        throw err
      })
      if (response) {
        const plants = response.data.data
        console.log(plants)
        let links
        if ( response.data.data.length === 20){
          links = response.data.links
        } else {
          links = {
            first: 'page=1',
            next: 'page=1',
            self: 'page=1',
            last: 'page=1'
          }
        }
        console.log(response.data.links)
        this.setState({ plants, links })
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount = () => {
    this.CallEdiblePlant(1)
  }

  ButtonOnClick = (event) => {
    console.log(event.target.value)
    let pageNum = event.target.value.split('page=')
    pageNum = pageNum[1]
    if (event.target.value === this.state.links.self) {
      pageNum = String(Number(pageNum) - 1)
      if (pageNum === '0') { 
        pageNum = '1' 
      }
    }
    console.log(pageNum)
    this.CallEdiblePlant(pageNum)
  }

  renderContent(){
    if (this.state.corsdemo){
      return (
        (
          <div className="container column">
            {this.state.corsdemo}
            <a href="https://cors-anywhere.herokuapp.com/corsdemo"> cors-anywhere demo</a>
          </div>
        )
      )
    }
  }

  render () {
    if (!this.state.plants || !this.state.links  ) return (
      <div className="container">{this.renderContent()}</div>
    )
  
    return (
      <div className="App">
        <div className="container search-form">
          <form>
            <SearchPlant filterPlants={this.filterPlants} searchQuery={this.searchQuery}/>
          </form>
        </div>
        <div className="field is-horizontal">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.plants.map((plant, i) => <PlantCard key={i} {...plant}/>)} 
            </div>
          </div>
        </div>
        <div className="buttons is-success is-centered">
          <button className="button is-primary" value={this.state.links.first} onClick={this.ButtonOnClick}>◀◀◀ First</button>
          <button className="button is-primary" value={this.state.links.self} onClick={this.ButtonOnClick}>◀ Previous</button>
          <button className="button is-primary" value={this.state.links.next} onClick={this.ButtonOnClick}>Next ▶</button>
          <button className="button is-primary" value={this.state.links.last} onClick={this.ButtonOnClick}>Last ▶▶▶</button>
        </div>
      </div>
    )
  }
}
export default Home