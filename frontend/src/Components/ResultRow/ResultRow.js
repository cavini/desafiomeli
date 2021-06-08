import React from 'react';
import Shipping from '../../Resources/shipping.png';

export default function ResultRow(props) {
  return (
    <>
      <div className="product-wrapper">
        <div>
          <img
            className="product-image"
            alt={props.data.title}
            src={props.data.picture}
          ></img>
        </div>
        <div className="product-description">
          <p className="price">
            $ {props.data.price.amount}
            {props.data.free_shipping ? (
              <img
                className="shipping-image"
                src={Shipping}
                alt={props.data.title}
              ></img>
            ) : (
              <></>
            )}
          </p>
          <p className="product-title">{props.data.title}</p>
        </div>

        <div className="location-wrapper">
          <p>{props.data.state_name}</p>
        </div>
      </div>
      <div className="gray-border"> </div>
    </>
  );
}
