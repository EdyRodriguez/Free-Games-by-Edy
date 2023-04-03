import React from 'react';
import RSSParser from './RSSParser';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import './App.css';
function App() {
  const rssUrl = '/proxy?url=https://steamcommunity.com/groups/freegamesfinders/rss/';

  return (
    <div className="App">
      <Navbar/>
      <RSSParser url={rssUrl} />
      <Footer/>
    </div>
  );
}

export default App;
