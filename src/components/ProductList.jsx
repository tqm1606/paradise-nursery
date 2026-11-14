import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice.jsx';

const collections = [
  {
    name: 'Easy-care favorites',
    note: 'Forgiving companions for busy weeks and first-time plant parents.',
    plants: [
      ['golden-pothos', 'Golden Pothos', 24, 'photo-1614594975525-e45190c55d0b'],
      ['snake-plant', 'Snake Plant', 32, 'photo-1593482892290-f54927ae2b9a'],
      ['zz-plant', 'ZZ Plant', 36, 'photo-1632207691143-643e2b09494b'],
      ['cast-iron', 'Cast Iron Plant', 29, 'photo-1501004318641-b39e6451bec6'],
      ['jade-plant', 'Jade Plant', 22, 'photo-1509423350716-97f9360b4e09'],
      ['spider-plant', 'Spider Plant', 19, 'photo-1572688484438-313a6e50c333'],
    ],
  },
  {
    name: 'Statement leaves',
    note: 'Sculptural silhouettes and lush foliage that make a room feel alive.',
    plants: [
      ['monstera', 'Monstera Deliciosa', 48, 'photo-1614594975525-e45190c55d0b'],
      ['rubber-tree', 'Rubber Tree', 42, 'photo-1509423350716-97f9360b4e09'],
      ['bird-paradise', 'Bird of Paradise', 68, 'photo-1597055181300-a8b2a6e56e17'],
      ['fiddle-leaf', 'Fiddle Leaf Fig', 58, 'photo-1501004318641-b39e6451bec6'],
      ['calathea', 'Calathea Orbifolia', 44, 'photo-1509423350716-97f9360b4e09'],
      ['alocasia', 'Alocasia Polly', 39, 'photo-1632207691143-643e2b09494b'],
    ],
  },
  {
    name: 'Small-space greens',
    note: 'Compact plants for shelves, desks, bright windowsills, and cozy corners.',
    plants: [
      ['peperomia', 'Peperomia Obtusifolia', 21, 'photo-1572688484438-313a6e50c333'],
      ['pilea', 'Chinese Money Plant', 26, 'photo-1593482892290-f54927ae2b9a'],
      ['string-hearts', 'String of Hearts', 28, 'photo-1459156212016-c812468e2115'],
      ['bird-nest-fern', 'Bird’s Nest Fern', 25, 'photo-1501004318641-b39e6451bec6'],
      ['parlor-palm', 'Parlor Palm', 34, 'photo-1597055181300-a8b2a6e56e17'],
      ['air-plant', 'Air Plant Duo', 18, 'photo-1459156212016-c812468e2115'],
    ],
  },
];

const imageUrl = (photo) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=720&q=85`;

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = new Set(cartItems.map((item) => item.id));

  return (
    <main className="catalog page-shell">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">Find your new favorite</p>
          <h1>Plants that feel like home.</h1>
        </div>
        <p className="catalog-intro">Good things grow here. Explore our hand-picked greens for every room and every kind of plant person.</p>
      </div>
      <nav className="collection-nav" aria-label="Plant collections">
        {collections.map((collection, index) => <a key={collection.name} href={`#collection-${index}`}>{collection.name}</a>)}
      </nav>
      {collections.map((collection, index) => (
        <section className="collection" id={`collection-${index}`} key={collection.name}>
          <div className="section-heading">
            <div><p className="eyebrow">Collection 0{index + 1}</p><h2>{collection.name}</h2></div>
            <p>{collection.note}</p>
          </div>
          <div className="plant-grid">
            {collection.plants.map(([id, name, price, photo]) => {
              const product = { id, name, price, image: imageUrl(photo) };
              const added = inCart.has(id);
              return (
                <article className="plant-card" key={id}>
                  <div className="plant-photo-wrap">
                    <img className="plant-photo" src={product.image} alt={`${name} houseplant`} loading="lazy" />
                    <span className="plant-tag">Nursery pick</span>
                  </div>
                  <div className="plant-info">
                    <div><h3>{name}</h3><p className="plant-caption">A fresh touch of green for your space</p></div>
                    <strong className="price">${price.toFixed(2)}</strong>
                  </div>
                  <button className={`button add-button${added ? ' added' : ''}`} type="button" disabled={added} onClick={() => dispatch(addToCart(product))}>
                    {added ? 'Added to cart' : 'Add to cart'} <span aria-hidden="true">{added ? '✓' : '+'}</span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
