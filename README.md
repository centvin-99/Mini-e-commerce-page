# Mini E-commerce Page (VStores)

A responsive mini e-commerce page listing 10 products across 5 categories. Users can filter by category, search by name, and add items to a dynamic cart that calculates the total automatically.

---

## Live Demo

[View Live Site](https://centvin-99.github.io/mini-ecommerce-page)

---

## About The Project

This was the most complex of my three projects. I wanted to build something that felt like a real shopping experience, not just a static product list. The main focus was on making the cart, filtering, and search all work together smoothly. I paid close attention to the UI design, using a dark header with a gold accent colour to give the store a premium look.

---

## Features

- 10 products across 5 categories: Shoes, Dresses, Belts, Shirts and Trousers
- Category filter dropdown to show products by type
- Real-time search bar that filters products as you type
- Add to cart with quantity tracking (adding the same item increases its count)
- Dynamic cart panel showing item list, total count, and total price in Naira
- Remove individual items from the cart
- Clear all cart items at once
- Toast notification banner when an item is added
- Sticky header that stays visible while scrolling
- Responsive design for mobile and desktop

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, sticky positioning, transitions, dropdown menus)
- JavaScript (DOM manipulation, array methods, event handling, dynamic UI)
- Google Fonts (Poppins)

---

## What I Learned

This project pushed my JavaScript skills the furthest. Managing the cart as an array of objects taught me how to work with structured data and update the UI based on that data. I learned how event.stopPropagation() works and why it is necessary when you have nested clickable elements like dropdowns inside a page that also listens for clicks. I also learned how to combine two filters (category and search) into a single function so they work together at the same time. Formatting the total price with toLocaleString() taught me how to display currency properly in code.

---

## Folder Structure

    mini-ecommerce-page/
    
    images/
        nike-air.png
        adidas-runner.png
        summer-dress.png
        evening-gown.png
        leather-belt.png
        fashion-belt.png
        casual-shirt.png
        polo-shirt.png
        chinos.png
        jeans.png
    index.html
    README.md
    script.js
    style.css

---

## Author

**Vincent** - [@Centvin-99](https://github.com/Centvin-99)
