import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../Context/globalContext';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';

export default function ProductDetail(props) {
  const globalContext = useContext(GlobalContext);
  const { productDetail, loading, error, validateDetailId } = globalContext;
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const response = await validateDetailId(props.match.params.id);
      if (response.valid) {
        history.push(`${response.path}`);
      } else {
        history.push(`${response.path}`);
      }
    })();
  }, []);
  return (
    <>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <>
                <Alert />
              </>
            ) : (
              <>
                <Breadcrumb />
                <div className="content-wrapper">
                  <div className="main-content">
                    <img
                      className="detail-product-image"
                      alt={productDetail.title}
                      src={productDetail.item.picture}
                    ></img>
                    <div className="product-info-container">
                      <div className="product-info">
                        <p className="product-condition">
                          {productDetail.item.condition} -{' '}
                          {productDetail.item.sold_quantity} vendidos
                        </p>
                        <p className="product-name">
                          {productDetail.item.title}
                        </p>
                        <p className="detail-price">
                          $ {productDetail.item.price.amount}
                        </p>
                      </div>
                      <div>
                        <button className="buy-button">Comprar</button>
                      </div>
                    </div>
                  </div>
                  {productDetail.item.description ? (
                    <div className="secondary-content">
                      <p className="description-title">
                        Descripción del producto
                      </p>

                      <p className="description">
                        {productDetail.item.description}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
