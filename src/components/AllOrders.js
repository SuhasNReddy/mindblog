import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const OrderList = ({ email }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/orders');
        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          console.error('Failed to fetch orders.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to trigger the fetch only once when the component mounts

  // Function to handle button click and print product details
  const handlePrintDetails = async (productId) => {
    const product = orders.find((order) => order.productId === productId);
    console.log(product);
    if (product && product.quantity > 0) {
      try {
        // Make API request to add product to myorders
        const addToMyOrdersResponse = await fetch('http://localhost:8000/myorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, email }),
        });

        if (addToMyOrdersResponse.ok) {
          console.log('Product added to myorders successfully.');
        } else {
          console.error('Failed to add product to myorders.');
        }

        // Make API request to reduce quantity by 1
        const reduceQuantityResponse = await fetch(`http://localhost:8000/orders/${product.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: product.quantity - 1 }),
        });

        if (reduceQuantityResponse.ok) {
          console.log('Quantity reduced successfully.');

          // Update the local state to reflect the reduced quantity
          const updatedOrders = orders.map((order) =>
            order.id === product.id ? { ...order, quantity: order.quantity - 1 } : order
          );
          setOrders(updatedOrders);

          // Display success message
          alert('Product added to your orders successfully!');
        } else {
          console.error('Failed to reduce quantity.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Product not found or out of stock.');
    }
  };

  // Conditionally render the component based on the presence of email
  return (
    <div>
      {email && (
        <>
          <h2>Products</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <strong>Order ID:</strong> {order.id}<br />
                <strong>Product ID:</strong> {order.productId}<br />
                <strong>Product Name:</strong> {order.productName}<br />
                <strong>Quantity:</strong> {order.quantity}
                <button onClick={() => handlePrintDetails(order.productId)}>
                  Print Details
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </>
      )}
      {!email && <div>You must be loggedIn</div>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps, null)(OrderList);
