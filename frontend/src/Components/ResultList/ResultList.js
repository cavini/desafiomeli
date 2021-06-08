import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ResultRow from '../ResultRow/ResultRow';
import GlobalContext from '../../Context/globalContext';
import Alert from '../Alert/Alert';
import Loading from '../Loading/Loading';

export default function ResultList() {
  const { search } = useLocation();
  const globalContext = useContext(GlobalContext);
  const history = useHistory();

  const searchQuery = search.split('=').pop();

  const {
    products,
    error,
    loading,
    getProductList,
    validateSearchQuery,

    isSearch,
  } = globalContext;

  useEffect(() => {
    if (!isSearch) {
      (async function () {
        const response = await validateSearchQuery(searchQuery);
        if (response.valid) {
          await getProductList(searchQuery);
          history.push(`/items?search=${response.path}`);
        } else {
          history.push('/items');
        }
      })();
    }
  }, []);

  return (
    <>
      <main>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {!error ? (
              <>
                {products.length > 0 ? (
                  <>
                    <Breadcrumb />
                    <div className="result-row-container">
                      {products.map((product) => (
                        <a key={product.id} href={`/items/${product.id}`}>
                          <ResultRow key={product.id} data={product} />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Alert />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
