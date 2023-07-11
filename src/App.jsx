
import './normalize.css';
import './App.scss';
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState('')
  const [couplet, setCouplet] = useState('')
  const [spinner, setSpinner] = useState(false);  

  const search = (keyword) => {
    setSpinner(true);
    fetch(`${import.meta.env.VITE_SITE_URL}/api?keyword=${keyword}`)
    .then(response => response.text() 
    .then(function (response) {
      setSpinner(false);
      setCouplet(response)
    })
    .catch(function (error) {
      console.error(error);
    }));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setCouplet(search(keyword))
}

  return (
    <main>

    <p className="instructions">Lyriki stitches together unlikely rhyming couplets from wikipedia articles and famous sonnets!</p>
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="keyword1" 
        onChange={event => setKeyword(event.target.value)}
        placeholder="keyword here"/>
      
        <button type="submit">search!</button>
    </form>
    {spinner ? <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : couplet ? <><div className="couplet">{couplet}</div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></> : null}
    </main>
  );
}

export default App;
