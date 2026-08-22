function createBuyButton(productId, containerId, buttonColor) {
  buttonColor = buttonColor || '#ff8e08'; // default orange
  var hoverColor = adjustBrightness(buttonColor, -20); // darken by 20% on hover
  var domain = 'znvmwf-1n.myshopify.com';
  var storefrontAccessToken = '8be6db72800cc518016c8b007c0cce94';
  
  // Utility to darken/lighten hex color
  function adjustBrightness(color, percent) {
    var num = parseInt(color.replace("#", ""), 16);
    var amt = Math.round(2.55 * percent);
    var R = (num >> 16) + amt;
    var G = (num >> 8 & 0x00FF) + amt;
    var B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
  
  function init() {
    var client = ShopifyBuy.buildClient({ domain: domain, storefrontAccessToken: storefrontAccessToken });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: productId,
        node: document.getElementById(containerId),
        moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0",
                  "margin-bottom": "50px"
                },
                "text-align": "left"
              },
              title: { "font-size": "26px", "font-family": "inherit" },
              button: {
                "font-family": "inherit",
                "font-weight": "bold",
                ":hover": { "background-color": hoverColor },
                "background-color": buttonColor,
                ":focus": { "background-color": hoverColor }
              },
              price: { "font-size": "18px", "font-family": "inherit" },
              compareAt: { "font-size": "15.3px", "font-family": "inherit" },
              unitPrice: { "font-size": "15.3px", "font-family": "inherit" }
            },
            layout: "horizontal",
            contents: { img: false, imgWithCarousel: true, description: true },
            width: "100%",
            text: { button: "Add to cart" }
          },
          modalProduct: {
            contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%", "margin-left": "0px", "margin-bottom": "0px"
                }
              },
              button: {
                "font-family": "inherit", "font-weight": "bold",
                ":hover": { "background-color": hoverColor },
                "background-color": buttonColor,
                ":focus": { "background-color": hoverColor }
              },
              title: { "font-family": "inherit", "font-weight": "bold", "font-size": "26px", "color": "#4c4c4c" },
              price: { "font-family": "inherit", "font-size": "18px", "color": "#4c4c4c" },
              compareAt: { "font-family": "inherit", "font-size": "15.3px", "color": "#4c4c4c" },
              unitPrice: { "font-family": "inherit", "font-size": "15.3px", "color": "#4c4c4c" }
            },
            text: { button: "Add to cart" }
          },
          cart: {
            styles: {
              button: {
                "font-family": "inherit", "font-weight": "bold",
                ":hover": { "background-color": hoverColor },
                "background-color": buttonColor,
                ":focus": { "background-color": hoverColor }
              }
            },
            text: { total: "Subtotal", button: "Checkout" },
            contents: { note: true },
            popup: false
          },
          toggle: {
            styles: {
              toggle: {
                "font-family": "inherit", "font-weight": "bold",
                "background-color": buttonColor,
                ":hover": { "background-color": hoverColor },
                ":focus": { "background-color": hoverColor }
              }
            }
          }
        }
      });
    });
  }
  
  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    init();
  } else {
    window.addEventListener('load', function () {
      // buy-button-storefront.min.js loads async in header; wait for it if needed
      var check = setInterval(function () {
        if (window.ShopifyBuy && window.ShopifyBuy.UI) {
          clearInterval(check);
          init();
        }
      }, 100);
    });
  }
}