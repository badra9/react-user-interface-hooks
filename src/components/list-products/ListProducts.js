import React, { useEffect, useState } from "react";
import data from "../../data/data";
import "./Listproducts.css";
import Card from "./card/Card";
import Cart from "./cart/Cart";

function ListProducts() {

  const [products, setProducts] = useState([]),
    [mvt, setMvt] = useState(false),
    [cart, setCart] = useState([]),
    [findArticleName, setFindArticleName] = useState(""),
    [findArticlePrice, setFindArticlePrice] = useState("");

  useEffect(() =>{
    setProducts([...data])
  },[]);

  /*
  méthode: findIndex
  retourne :
          - la cart
          - l'indice de l'élément recherché dans la carte (found)

  */
    function findIndex(elt) {
      let intermediaire = cart;
      let found = intermediaire.findIndex((produit) => produit.id === elt.id);
      return { found, intermediaire };
    }

    /*
  méthode: cancelMvt
      initialise la variable d'état 'Mvt' à false

  */
    function cancelMvt() {
      if (cart.length === 0) {
        setMvt(false);
      }
    }
  /*
    méthode: activeMvt
      initialise la variable d'état 'Mvt' à true

  */
    function activeMvt() {
      if (mvt === false) {
        setMvt(true);
      }
    }

    /*
    méthode: addToCart
      ajout un produit à la carte
  */
    function addToCart(elt) {
      // mettre la variable mvt en true
      activeMvt();
      const { found, intermediaire } = findIndex(elt);

      if (found === -1) {
        setCart([...cart, elt]);
      } else {
        intermediaire[found].quantity = intermediaire[found].quantity + 1;

        setCart([...intermediaire]);
      }
    }

    /*
    méthode: incrementQuantity
      incrementer la quantité d'un produit
  */
    function incrementQuantity(elt) {
      const { found, intermediaire } = findIndex(elt);
      //alert(found);
      intermediaire[found].quantity = intermediaire[found].quantity + 1;

      setCart([...intermediaire]);
    }

      /*
    méthode: decrementQuantity
      décrementer la quantité d'un produit
  */
    function decrementQuantity(elt) {
      const { found, intermediaire } = findIndex(elt);

      if (elt.quantity > 1) {
        elt.quantity = elt.quantity - 1;

        setCart([...intermediaire]);
      } else {
        deleteFromCart(elt);
      }

      cancelMvt();
    }

  /*
    méthode: deleteFromCart
      supprimer un produit
  */
    function deleteFromCart(elt) {
      const { found, intermediaire } = findIndex(elt);
      // supprimer l'elt qui a l'indice found
      intermediaire.splice(found, 1);

      setCart([...intermediaire]);

      cancelMvt();
    }

  /*
    méthode: handleChangeName
      attribuer la valeur saisie par user dans le champ 'search' à la variable d'état findArticleName
  */
    function handleChangeName(e) {
      setFindArticleName(e.target.value);
    }
  /*
    méthode: handleChangePrice
      attribuer la valeur saisie par user dans le champ 'number' à la variable d'état findArticlePrice
  */
    function handleChangePrice(e) {
      setFindArticlePrice(e.target.value);
    }

  /*
    méthode: filteredArticles
      filtrer les produits par rapport aux saisies de user
  */
    function filteredArticles() {
      let tab = products.filter((elt) =>
        elt.description.toLowerCase().includes(findArticleName.toLowerCase())
      );

      if (parseInt(findArticlePrice) > 0) {
        tab = tab.filter((elt) => elt.price <= findArticlePrice);
      }
      return tab;
    }

    // console.log(this.state.data);
    return (
      <div>
        <div className="global-container">
          <h1 className="title">Articles</h1>
          <div className="filter">
            <div className="filter-name">
              <label>Nom : </label>
              <input
                name="findArticleName"
                type="search"
                value={findArticleName}
                onChange={handleChangeName}
              />
            </div>
            <div className="filter-price">
              <label>Prix max : </label>
              <input
                min="0"
                name="findArticlePrice"
                type="number"
                value={findArticlePrice}
                onChange={handleChangePrice}
              />
            </div>
          </div>
          <div className="container">
            <div
              className={
                "card-container" +
                " " +
                (mvt === true ? "card-container-mvt" : "")
              }
            >
              {filteredArticles().length > 0 ? (
                filteredArticles().map((elt) => (
                  <Card
                    key={elt.id}
                    img={elt.img}
                    description={elt.description}
                    price={elt.price}
                    addToCart={addToCart}
                    elt={elt}
                  />
                ))
              ) : (
                <p className="aucun-produit">
                  Désolé, aucun produit correspond à votre recherche
                </p>
              )}
            </div>

            <div
              className={
                "shopping-cart" + " " + (mvt === true ? "shopping-cart-mvt" : "")
              }
            >
              <h2 className="panier">Panier</h2>
              <div className="list-item">
                {cart.map((elt) => (
                  <Cart
                    key={elt.id}
                    img={elt.img}
                    description={elt.description}
                    price={elt.price * elt.quantity}
                    quantity={elt.quantity}
                    incrementQuantity={() => incrementQuantity(elt)}
                    decrementQuantity={() => decrementQuantity(elt)}
                    deleteFromCart={() => deleteFromCart(elt)}
                    elt={elt}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ListProducts