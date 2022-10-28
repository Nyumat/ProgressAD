import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState('loading');

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        setData(res.data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Hello, {data.username}!
      </header>
    </div>
  );
}

export default App;
