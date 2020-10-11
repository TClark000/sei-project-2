import React from 'react'

import { getPlantsEdible, getPlantsEdibleQueryTwo } from '../lib/api'
import PlantCard from './PlantCard'
import SearchPlant from './SearchPlant'

class Home extends React.Component {

  state  = {
    plants: [],
    search: [],
    searchQuery: '',
    links: null
  }

  filterPlants = async(event) => {
    // console.log(event.target.value)
    const searchQuery = event.target.value
    const response = await getPlantsEdibleQueryTwo(searchQuery)
    const plants = response.data.data
    const links = response.data.links
    console.log(response, response.data, links)
    this.setState({ plants, searchQuery, links })
  }

  
  CallEdiblePlant = async (pageNum) => {
    const response = await getPlantsEdible(pageNum)
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

  render () {
    if (!this.state.plants || !this.state.links  ) return null

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