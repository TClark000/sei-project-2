# Reactathon | sei50-project II
> Consume a RestAPI with React and Axios.  A paired project over approx a day and half.

Project updated here with serverless functions: https://github.com/TClark000/sei-project-2-serverless-funtions#readme

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Code Examples](#code-examples)
* [Features](#features)
* [Challenges and Wins](#challenges-and-wins)
* [Status](#status)

## General info
Trefle is a global botanical API, https://trefle.io  
It is an open sourced dataset with over 1 million plants.  To narrow the focus for this **Reactathon** project the focus was on **edible plants**.

## Screenshots

In the below image a search for garlic displays 2 edible plants from the family Amaryllidaceae.  Members of the family characteristically feature bulbs or underground stems and straplike leaves.

![Example screenshot](./img/search-garlic.png)

## Technologies

Front End:
- React
- JavaScript
- Axios
- SCSS
- Bulma
- react-responsive-carousel
- React router dom

Dev Tools:
- Netlify
- Git 
- Github
- VSCode
- Insomnia
- Eslint
- Google Chrome dev tools

## Setup

Prior to running the app, enable CORS Anywhere, by completing the challenge on the site https://cors-anywhere.herokuapp.com/corsdemo and temporarily unlock the demo. Further details on https://github.com/Rob--W/cors-anywhere/issues/301

Deployed with netlify the React API webapp is hosted here:
https://clever-joliot-1b11e8.netlify.app/

`yarn start` run the development server

`yarn run build` create a build directory

`netlify deploy --build` deploy with netlify

## Code Examples

Shown is the API request with an edible plant filter.  The token was stored in the config variable and a proxyUrl was required.

```js
const token =  process.env.REACT_APP_MY_API_KEY
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const baseUrl = proxyUrl + 'https://trefle.io/api/v1/'

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}
```
```js
export const getPlantsEdible = (pageNum) => {
  return axios.get(`${baseUrl}/species?filter[edible]=true&page=${pageNum}`, config)
}
```

The ternary operator: a ? b : c, was used to determine data displayed:

```js
{common_name ? <div className="is-capitalized">{common_name}</div> : <div className="is-italic">{scientific_name}</div>}
```

Shown is the function that places and returns the API request based on the user search query:

```js
  filterPlants = async(event) => {
    const searchQuery = event.target.value
    const response = await getPlantsEdibleQueryTwo(searchQuery)
    const plants = response.data.data
    const links = response.data.links
    this.setState({ plants, searchQuery, links })
  }
```

## Features
List of features ready & TODOs for future development
* search via regions, this idea was initiated with DropDownFilter.js though not implemented
* explore other API filter options

## Challenges and Wins
* Working with the proxyUrl requirements was an initial challenge, [Code Examples](#code-examples)
* Understanding the parameter requirements for the API to filter for edible plants and on search queries
* The conditional (ternary) operator was a win; using it to determine data displayed and I recently discovered its in PowerShell vs7 (cool)
* In general project 2 was about fundamentals, code pairing, consuming an api, committing and storing code in GitHub, setting up a NavBar with react-router-dom links and styling with Bulma

## Status
Project is: _currently_shelved (while focusing on other projects!)