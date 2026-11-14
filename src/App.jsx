import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs.jsx';
import ProductList from './components/ProductList.jsx';
import CartItem from './components/CartItem.jsx';

function Brand({ onHome }) {
  return <button className="brand" onClick={onHome} aria-label="Paradise Nursery home"><span className="brand-mark" aria-hidden="true">✳</span><span>paradise<span className="brand-light"> nursery</span></span></button>;
}

function Navbar({ page, cartCount, navigate }) {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand onHome={() => navigate('home')} />
        <nav className="main-nav" aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Home</button>
          <button className={page === 'plants' ? 'active' : ''} onClick={() => navigate('plants')}>Plants</button>
          <button className={`cart-link${page === 'cart' ? ' active' : ''}`} onClick={() => navigate('cart')} aria-label={`Cart, ${cartCount} items`}>
            <span className="cart-symbol" aria-hidden="true">♧</span><span>Cart</span><span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Landing({ onGetStarted }) {
  return (
    <main className="landing page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span></span> Grow a little wonder</p>
          <h1 id="hero-title">Bring the outside <em>in.</em></h1>
          <p className="hero-description">Meet the houseplants that make a space feel more like home. Handpicked greens, easy care, and a little joy in every leaf.</p>
          <button className="button hero-button" onClick={onGetStarted}>Get started <span aria-hidden="true">↗</span></button>
          <div className="hero-footnote"><span aria-hidden="true">✳</span> Thoughtfully picked for everyday living</div>
        </div>
        <div className="hero-stamp"><span>GROW</span><strong>well</strong><span>LIVE GREEN</span></div>
      </section>
      <div className="landing-bottom"><AboutUs /><div className="promise-card"><span className="promise-icon">✿</span><p>Good plants.<br /><strong>Good energy.</strong></p><span className="promise-small">A greener home starts here.</span></div></div>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return <div className="app"><Navbar page={page} cartCount={cartCount} navigate={setPage} />
    {page === 'home' && <Landing onGetStarted={() => setPage('plants')} />}
    {page === 'plants' && <ProductList />}
    {page === 'cart' && <CartItem onContinueShopping={() => setPage('plants')} />}
    <footer className="site-footer"><span>© Paradise Nursery</span><span>Make room for a little green.</span></footer>
  </div>;
}
