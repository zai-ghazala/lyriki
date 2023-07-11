import './normalize.css';
import './App.css';
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState('');
  const [couplet, setCouplet] = useState();
  const [spinner, setSpinner] = useState(false);

  const search = (keyword) => {
    setSpinner(true);
    fetch(`${import.meta.env.VITE_SITE_URL}/api?keyword=${keyword}`).then(
      (response) =>
        response
          .json()
          .then(function (response) {
            setSpinner(false);
            setCouplet(response);
          })
          .catch(function (error) {
            console.error(error);
          })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCouplet(search(keyword));
  };

  return (
    <main>
      <p className='instructions'>
        Lyriki stitches together unlikely rhyming couplets from wikipedia
        articles and famous sonnets! <br />
        <br />
        Made by <a href='https://www.zaiz.ai'>Zai</a>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='keyword'
          onChange={(event) => setKeyword(event.target.value)}
          placeholder='wiki article here'
        />

        <button type='submit'>search</button>
      </form>
      {spinner ? (
        <div className='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : couplet ? (
        <>
          <div className='couplet'>
            {couplet.message}

            {!couplet.error ? (
              <>
                <br />
                <br />
                <span className='sources'>Sources</span>
                <br />
                <span className='title'>{couplet.title}</span>
                <span className='author'>— {couplet.author}</span>
                <br />
                <a href={`https://en.wikipedia.org/wiki/${keyword}`}>
                  wikipedia article
                </a>
              </>
            ) : null}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : null}
    </main>
  );
}

export default App;
