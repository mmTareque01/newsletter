(function () {
  // Extract API key from the script tag's src
  const scripts = document.getElementsByTagName("script");
  let apiKey = "";
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute("src");
    if (src && src.includes("widget.js") && src.includes("apiKey=")) {
      const url = new URL(src);
      apiKey = url.searchParams.get("apiKey");
      break;
    }
  }

  if (!apiKey) {
    console.error("API key is required to use the widget.");
    return;
  }

  const style = `
    .newsletter-form {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 10px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      max-width: 400px;
      background: #f9f9f9;
      font-family: Arial, sans-serif;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    .newsletter-title {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .newsletter-input {
      width: 100%;
      padding: 12px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .newsletter-button {
      padding: 10px 20px;
      font-size: 14px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .newsletter-button:hover {
      background-color: #0056b3;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = style;
  document.head.appendChild(styleTag);

  const form = document.createElement("form");
  form.className = "newsletter-form";
  form.innerHTML = `
    <div class="newsletter-title">Subscribe to our Newsletter</div>
    <input class="newsletter-input" type="email" name="email" placeholder="Your email address" required />
    <button class="newsletter-button" type="submit">Subscribe</button>
  `;

  form.onsubmit = async function (e) {
    e.preventDefault();
    const email = form.email.value;

    try {
      const res = await fetch("http://localhost:3030/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey, // Pass API key in header
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      alert(result.message || "Subscribed!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe. Try again.");
    }
  };

  const placeholder = document.getElementById("newsletter-widget-root");
  if (placeholder) {
    placeholder.appendChild(form);
  } else {
    console.error("Newsletter widget root element not found");
  }
})();
