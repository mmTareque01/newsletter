// widget.js (host this on your server)
(function () {
  const style = `
    .newsletter-form {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-family: sans-serif;
    }
    .newsletter-input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      flex: 1;
    }
    .newsletter-button {
      padding: 10px 20px;
      border: none;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    .newsletter-button:hover {
      background-color: #45a049;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = style;
  document.head.appendChild(styleTag);

  const form = document.createElement("form");
  form.className = "newsletter-form";
  form.innerHTML = `
    <input class="newsletter-input" type="email" name="email" placeholder="Your email address" required />
    <button class="newsletter-button" type="submit">Subscribe</button>
  `;

  form.onsubmit = async function (e) {
    e.preventDefault();
    const email = form.email.value;

    try {
      const res = await fetch(
        "http://localhost:5001/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();
      alert(result.message || "Subscribed!");
      form.reset();
    } catch (err) {
      alert("Failed to subscribe. Try again.");
    }
  };

  // Insert the form into the placeholder
  const placeholder = document.getElementById("newsletter-widget-root");
  if (placeholder) {
    placeholder.appendChild(form);
  } else {
    console.error("Newsletter widget root element not found");
  }
})();
