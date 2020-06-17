import React from 'react';



import './App.css';
import Gif from './Gif';
import axios from 'axios';
import songFile from './theScotts_.mp3';
import Switch from '@material-ui/core/Switch';
import BGSelector from './BGSelector';
import TXSelector from './TXSelector';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      img: null,
      data: [], 
      bgColor: null,
      showBG: true,
      txtImg: null,
    };
    this.audio = new Audio(songFile);
    // this.audio.loop = true;
    // this.audio.autoplay = true;
  }

handleSubmit = () => {
  
  
  axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: 'dpj1p2rktpG0tjnHWlVqReVgCKUR7BuS',
      q: this.state.searchText,
    }
  }).then(res => {
    
    this.setState({data: res.data.data});
    
    this.nextGiphy();
  })
}

changeBackGround = (color) => {
  this.setState({bgColor: color});
}

async nextGiphy(){

  
  for(let i = 0; i < this.state.data.length; i++){
    
    this.setState({img: this.state.data[i].embed_url});
    
    
    await new Promise(r => setTimeout(r, 5000));
  }
}

handleChange = (events) => {
  this.setState({searchText: events.target.value});
}

clickSwitch = () => {
  this.setState({showBG: !this.state.showBG});
  console.log(this.state.showBG);
}

changeTexture = (texture) => {
  this.setState({txtImg: texture});
}

render() {
  const foo = this.state.showBG;
  
    return (
      <div className="App" style={this.state.showBG ? {backgroundColor: this.state.bgColor} : {backgroundImage: `url(${this.state.txtImg})`, backgroundSize: '100% 100%' }}>
        <div style={{position: 'absolute', right: '40px', top: '40px'}}>
          <Switch onChange={this.clickSwitch} />
          {
            this.state.showBG ?
              <BGSelector selector={(e) => { this.changeBackGround(e) }}/>
              :
              <TXSelector selector={(e) => { this.changeTexture(e)}} />
          }
          
        </div>
        <div style={{position: 'absolute', top: '0', left: '450px'}}>
          <div className="searchbox">
            <label>Search for Gif: </label>
            <input name="search" id="search" type="text" onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>submit</button>
            <Gif url={this.state.img}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
