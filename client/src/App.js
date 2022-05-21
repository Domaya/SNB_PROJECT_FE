import React, {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Welcome from './components/Welcome'
import Home from './components/Home'
import Nav from './components/Nav'


function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
    }}>To Do List for you</a></h1>
    <p>{props.userName}</p>
  </header>
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const loginCheck = async () => {
    
  }

  const [userObj, setUserObj] = useState(null);

  const [userName, setUserName] = useState("철수");

  return (
    <div className="App">
      {/* <Header userName={userName}/> */}
      
      {isLoggedIn ?  <><Nav onLogout={()=>{setIsLoggedIn(false)}}/><Home /></> : <Welcome onLogin={()=>setIsLoggedIn(true)}/>}
      
      
    </div>
  );
}

export default App;
