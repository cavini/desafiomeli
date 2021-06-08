import React, { useContext } from 'react';
import SearchIcon from '../../Resources/SearchIcon.png';
import GlobalContext from '../../Context/globalContext';
import { useHistory } from 'react-router-dom';

export default function SearchBox() {
  const globalContext = useContext(GlobalContext);

  const history = useHistory();

  const { validateSearchQuery, setIsSearch } = globalContext;
  const submit = async (e) => {
    e.preventDefault();
    setIsSearch(true);
    const response = await validateSearchQuery(e.target[0].value);

    if (response.valid) {
      history.push(`${response.path}`);
    } else {
      history.push('/items');
    }
  };
  return (
    <>
      <form onSubmit={submit}>
        <input
          className="search-box"
          type="text"
          placeholder="Nunca dejes de buscar"
        />

        <button className="search-button">
          <img
            className="search-image"
            alt="Busque no Mercado Livre"
            src={SearchIcon}
          />
        </button>
      </form>
    </>
  );
}
