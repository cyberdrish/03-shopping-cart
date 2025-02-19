import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api-mock/products-api";

const fetchProductApi = async () => {
  const res = await fetchProducts().then((products) => {
    console.log("Fetched the products", products);
    return products;
  });
  return res;
};

const App = () => {
  const [cart, setCart] = useState({});
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductApi,
  });
  const [total, setTotal] = useState(0);

  const addtocart = (product) => {
    setCart((OldCart) => {
      const updateCart = { ...OldCart };
      if (updateCart[product.id]) {
        updateCart[product.id].quantity += 1;
      } else {
        updateCart[product.id] = { ...product, quantity: 1 };
      }
      return updateCart;
    });
  };
  const reduceQuantity = (id) => {
    setCart((OldCart) => {
      const updateCart = { ...OldCart };
      if (updateCart[id].quantity > 1) {
        updateCart[id].quantity -= 1;
      } else {
        delete updateCart[id];
      }
      return updateCart;
    });
  };
  const increaseQuantity = (id) => {
    setCart((OldCart) => {
      const updateCart = { ...OldCart };

      updateCart[id].quantity += 1;
      return updateCart;
    });
  };

  useEffect(() => {
    setTotal(
      Object.values(cart).reduce((sum, i) => {
        const price = i.quantity > 3 ? i.price * 0.9 : i.price;
        return sum + price * i.quantity;
      }, 0)
    );
  }, [cart]);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header>
        <h1 style={{ textAlign: "center" }}>Coffee Shop </h1>
        <h3 style={{ textAlign: "center" }}>
          Here are the available products:{" "}
        </h3>
      </header>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "3fr 1fr" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(200px,100%),1fr))",
            // flexWrap: "wrap",
            // justifyContent: "space-evenly",
            maxHeight: 400,
            padding: 2,
          }}
        >
          {!products ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "grid",
                  // flexDirection: "column",
                  justifyContent: "center",
                  padding: 4,
                }}
              >
                <div
                  type="card"
                  style={{
                    display: "flex",
                    padding: 2,
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`images/${product.image}`}
                    width="200px"
                    height="190px"
                    style={{ borderRadius: "1%" }}
                  />
                </div>
                <p>
                  {product.name} ( price: ${product.price})
                </p>
                <button
                  type="button"
                  key={product.id}
                  onClick={() => addtocart(product)}
                >
                  Add to cart
                </button>
              </div>
            ))
          )}
        </div>
        <div
          type="card"
          style={{
            display: "block",
            padding: 7,
            backgroundColor: "lightgray",
            height: "auto",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Shopping Cart:</div>
          {Object.keys(cart).length !== 0 && (
            <div style={{ paddingTop: 5 }}>
              Number of item in cart:{" "}
              {Object.values(cart).reduce((sum, i) => {
                return sum + i.quantity;
              }, 0)}
            </div>
          )}
          <div>
            <table style={{ width: "100%" }}>
              {Object.keys(cart).length === 0 ? (
                <tbody>
                  <tr>
                    <td>
                      You haven’t added anything to your shopping cart yet.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <thead style={{ paddingBottom: "15px", marginBottom: "15px" }}>
                  <tr style={{ textAlign: "left" }}>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                  <tr>
                    <th colSpan="3" style={{ height: "15px" }}></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {cart &&
                  Object.values(cart).map((a) => {
                    return (
                      <tr key={a.id}>
                        <td scope="row">{a.name}</td>
                        <td>
                          <button onClick={() => reduceQuantity(a.id)}>
                            -
                          </button>{" "}
                          {a.quantity}{" "}
                          <button onClick={() => increaseQuantity(a.id)}>
                            +
                          </button>
                        </td>
                        <td>{a.price}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <td style={{ fontWeight: "bold" }}>Total</td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}>${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer
        style={{
          borderTop: "1px solid lightgrey",
          color: "lightgray",
          margin: "40px 4px 4px 4px",
          padding: "5px ",

          textAlign: "center",
        }}
      >
        Footer Content
      </footer>
    </div>
  );
};

export default App;
