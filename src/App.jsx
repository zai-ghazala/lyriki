
import './App.scss';
import { useState } from 'react';

function App() {
  const [keyword1, setKeyword1] = useState('')
  const [keyword2, setKeyword2] = useState('')
  const [couplet, setCouplet] = useState('')

  const generate = (keyword1, keyword2) => {
    fetch(`${import.meta.env.VITE_SITE_URL}/api?keyword1=${keyword1}&keyword2=${keyword2}/`)
    .then(response => response.text()  
    .then(function (response) {
      setCouplet(response)
    })
    .catch(function (error) {
      console.error(error);
    }));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setCouplet(generate(keyword1, keyword2))
}

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="keyword1" 
        onChange={event => setKeyword1(event.target.value)}/>
        <input 
        type="text" 
        name="keyword2" 
        onChange={event => setKeyword2(event.target.value)}/>
      
        <input type="submit" />
    </form>

    {couplet ? couplet : null}
    </div>
  );
}

export default App;
