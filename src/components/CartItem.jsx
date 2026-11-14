import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../store/CartSlice.jsx';

const money = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="cart-page page-shell">
      <div className="cart-heading">
        <div><p className="eyebrow">Your little corner of green</p><h1>Shopping cart</h1></div>
        <button className="text-button" type="button" onClick={onContinueShopping}>← Continue shopping</button>
      </div>
      {items.length === 0 ? (
        <section className="empty-cart"><span className="empty-icon" aria-hidden="true">♧</span><h2>Your cart is ready to grow.</h2><p>Pick a plant that makes you smile and it’ll show up here.</p><button className="button button-dark" onClick={onContinueShopping}>Explore plants</button></section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            <div className="cart-table-head"><span>Plant</span><span>Quantity</span><span>Line total</span></div>
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <div className="cart-product">
                  <img src={item.image} alt={`${item.name} houseplant`} />
                  <div><h2>{item.name}</h2><p>Houseplant · {money(item.price)} each</p><button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></div>
                </div>
                <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
                <strong className="line-total">{money(item.price * item.quantity)}</strong>
              </article>
            ))}
          </section>
          <aside className="order-summary">
            <p className="eyebrow">A good choice</p><h2>Order summary</h2>
            <div className="summary-line"><span>Plants ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span><span>{money(total)}</span></div>
            <div className="summary-line"><span>Delivery</span><span className="delivery-note">Calculated at checkout</span></div>
            <div className="summary-total"><span>Subtotal</span><strong>{money(total)}</strong></div>
            <button className="button button-dark checkout-button" onClick={() => setCheckoutMessage('Coming soon — checkout is being planted!')}>Continue to checkout</button>
            {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
            <button className="clear-button" onClick={() => dispatch(clearCart())}>Clear cart</button>
          </aside>
        </div>
      )}
    </main>
  );
}
