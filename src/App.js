import React,{useEffect,useState, Component} from 'react';
import Promise from "promise";
import Md5 from 'md5';
import Character from "./Character";
import './App.css';
import { getMarvelCharacters} from "./CallAPI";






class App extends Component {
  state = {
    loading: false,
    filters: {
      name: {
        value: '',
        exactMatch: false,
      }
    },
    sortName: '',
    characters: [],
    page: 0,
    maxPage: 0,
    limitPerPage: 20,
  };

   
  // const [names,setNames] = useState([]);
  // const [search,setSearch] = useState("");
  // const [query,setQuery] = useState("");

  search = (options = {}) => {
    this.setState({ loading: true });
    const {
      page,
      name,
      exactName,
      sortName,
      limit,
    } = Object.assign({
      page: 1,
      name: this.state.filters.name.value,
      exactName: this.state.filters.name.exactName,
      sortName: this.state.sortName,
      limit: this.state.limitPerPage,
    }, options);
    const offset = page ? (page - 1) * limit : 0;

    const p = new Promise((resolve, reject) => {
      getMarvelCharacters({ offset, name, exactName, sortName, limit })
        .then(({ characters, maxPage }) => {
          this.setState({
            characters,
            maxPage,
            page: characters.length ? page : 0,
            filters: { name: { value: name, exactName } },
            sortName,
            limitPerPage: limit,
          });
          resolve({ characters, maxPage, page });
        })
        .catch((error) => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  }


  // useEffect( () => {
  //       getNames();
  // },[]);

  // const getNames = async () => {
  //   const response = await fetch(
  //     `https://gateway.marvel.com/v1/public/characters?${query}ts=${timestamp}&apikey=${APP_ID}&hash=${hash}`
  //     );
  //   const data = await response.json();
  //   setNames(data.data.results);
  //   console.log(data.data.results);
  //   };

    // const updateSearch = e => {
    //   setSearch(e.target.value);
    // };

    // const getSearch = e => {
    //   setQuery(search);
    //   e.preventDefault();
    // } 


    render() {
    return(
    <div className="App">
    <form  className="search-form">
      <input className="search-bar" type="text" />
      <button className="search-button" type="submit">Search</button>

    </form>
    
    
          <div className="App-characters">{
            this.state.characters.map(c => <Character key={c.id} instance={c}/>)
        }</div>}
        {/* {this.state.loading && <Loading />} */}
      <h1>Hello</h1>
    </div>
  );
  
};
};
export default App;
