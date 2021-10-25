import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img
          className="img-respensive"
          src={props.img}
          alt={props.description}
        />
      </div>
      <div className="card-icons">
        <div className="like-product">
          <i className="fas fa-heart"></i>
        </div>
        <div className="add-to-cart">
          <i
            className="fas fa-shopping-cart"
            onClick={() => props.addToCart(props.elt)}
          ></i>
        </div>
      </div>
      <div className="card-text">
        <h4>{props.description}</h4>
        <span>{props.price} &euro;</span>
      </div>
    </div>
  );
}
export default Card;
