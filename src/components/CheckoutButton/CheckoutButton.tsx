import React, { FunctionComponent } from 'react';
import './CheckoutButton.scss';


interface ICheckoutButtonProps {
  buttonClickHandler: () => void;
}

const CheckoutButton: FunctionComponent<ICheckoutButtonProps> = props => {
  return (
    <div className="checkout-button__container">
      <button className="checkout-button" onClick={props.buttonClickHandler}>Go to checkout</button>
    </div>
  );
};

export default CheckoutButton;
