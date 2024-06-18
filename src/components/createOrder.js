import React, { useState } from 'react';
import { connect } from 'react-redux';

const OrderForm = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!productId || !productName || !price || !quantity) {
      alert('All fields are required.');
      return;
    }

    // Additional validations (you can customize these based on your requirements)
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }

    if (isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
      alert('Please enter a valid positive quantity.');
      return;
    }

    try {
      // Check if the product with the given productId already exists in orders
      const checkResponse = await fetch(`http://localhost:8000/orders?productId=${productId}`);
      const existingProducts = await checkResponse.json();

      if (existingProducts.length > 0) {
        alert('Product with the provided ID already exists in orders. Cannot add duplicate.');
        return;
      }

      // If the product doesn't exist, create an order object
      const newOrder = {
        productId,
        productName,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      // Send the new order to your server or API endpoint
      const addOrderResponse = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (addOrderResponse.ok) {
        console.log('Order added successfully!');
        // Optionally, you can reset the form after a successful submission
        setProductId('');
        setProductName('');
        setPrice('');
        setQuantity('');
      } else {
        console.error('Failed to add order.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};


  

export default (OrderForm);
