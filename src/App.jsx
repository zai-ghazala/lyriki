
import './normalize.css';
import './App.scss';
import { useState } from 'react';

function App() {
  const [keyword1, setKeyword1] = useState('')
  const [keyword2, setKeyword2] = useState('')
  const [couplet, setCouplet] = useState('')
  const [spinner, setSpinner] = useState(false);  

  const generate = (keyword1, keyword2) => {

    setSpinner(true);
    fetch(`${import.meta.env.VITE_SITE_URL}/api?keyword1=${keyword1}&keyword2=${keyword2}`)
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
  setCouplet(generate(keyword1, keyword2))
}

  return (
    <main>

    <p className="instructions">Lyriki looks for rhyming couplets collected from 2 wikipedia articles<br/>(You can keep pressing search on the same keywords to find new random rhymes)</p>
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="keyword1" 
        onChange={event => setKeyword1(event.target.value)}
        placeholder="keyword here"/>
        <input 
        type="text" 
        name="keyword2" 
        onChange={event => setKeyword2(event.target.value)}
        placeholder="another keyword here"/>
      
        <button type="submit">search!</button>
    </form>
    {spinner ? <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : couplet ? <><div className="couplet">{couplet}</div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></> : null}
    </main>
  );
}

export default App;
