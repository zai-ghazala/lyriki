import './normalize.css';
import './App.css';
import { useState } from 'react';

function App({content}) {
  const [keyword, setKeyword] = useState('');
  const [couplet, setCouplet] = useState();
  const [spinner, setSpinner] = useState(false);

  const search = (keyword) => {
    setSpinner(true);
    document.body.classList.add('spinner')
    fetch(`${import.meta.env.VITE_SITE_URL}/api?keyword=${keyword}`).then(
      (response) =>
        response
          .json()
          .then(function (response) {
            setSpinner(false);
            document.body.classList.remove('spinner')
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
        Lyriki finds serendipitous rhyming couplets made from wikipedia
        articles and famous sonnets.<br />
        <br />
        Made by <a href='https://www.zaiz.ai'>Zai</a>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='keyword'
          onChange={(event) => setKeyword(event.target.value)}
          placeholder='type wiki article name here'
        />

        <button type='submit'>search</button>
      </form>
      {spinner ? (
        null
      ) : couplet ? (
        <>
          <div className='couplet transition' key={content}>
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
                <a href={`https://simple.wikipedia.org/wiki/${keyword}`}>
                  wikipedia article
                </a>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </main>
  );
}

export default App;
