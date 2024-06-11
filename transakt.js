// payment-gateway.js
(function() {
  function generatePaymentURL(inputs) {
      const baseUrl = 'http://localhost:3000/pay';
      const params = new URLSearchParams({
          inputs: JSON.stringify(inputs)
      });

      return `${baseUrl}?${params.toString()}`;
  }

  function redirectToPaymentPage(inputs) {
      const paymentURL = generatePaymentURL(inputs);
      window.location.href = paymentURL;
  }

  // Expose the function globally
  window.redirectToPaymentPage = redirectToPaymentPage;
})();
