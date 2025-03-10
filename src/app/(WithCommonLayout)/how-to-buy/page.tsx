

const HowToBuy = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">How to Buy</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">1. Browse by Category</h3>
          <p>Explore different product categories and find the items you need.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">2. Click on Buy</h3>
          <p>Select the product and click the <strong>Buy</strong> button to add it to your cart.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">3. Adjust Quantity</h3>
          <p>Increase or decrease the quantity of the product in your cart as needed.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">4. Provide Your Email</h3>
          <p>Enter your email address to receive order details and updates.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">5. Apply Coupon (If Available)</h3>
          <p>If you have a discount coupon, enter the code and click <strong>Apply</strong>.</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">6. Place Your Order</h3>
          <p>Click on the <strong>Order</strong> button to complete your purchase.</p>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;