import React from "react";
import "./cart.css";

function Cart(props) {
  return (
    <div className="item">
      <div className="img-container">
        <img className="img-respensive" src={props.img} />
      </div>
      <div className="info">
        <p>{props.description}</p>
        <p>{props.price} &euro;</p>
      </div>
      <div className="qtite-icons">
        <h6>Quantité: {props.quantity}</h6>
        <div className="cart-icons">
          <button>
            <i
              onClick={() => props.incrementQuantity(props.elt)}
              className="fas fa-plus"
            ></i>
          </button>
          <button>
            <i
              onClick={() => props.decrementQuantity(props.elt)}
              className="fas fa-minus"
            ></i>
          </button>
          <button>
            <i
              onClick={() => props.deleteFromCart(props.elt)}
              className="fas fa-trash-alt"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
