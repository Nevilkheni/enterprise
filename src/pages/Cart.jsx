import React from "react";
import { useNavigate } from "react-router-dom";


function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Your Cart
      </h2>
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4 opacity-70"
            />
            <p className="text-gray-500 text-lg font-medium">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-center border-collapse mb-8 min-w-[700px]">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-3 font-bold">Image</th>
                    <th className="py-3 font-bold">Name</th>
                    <th className="py-3 font-bold">Price</th>
                    <th className="py-3 font-bold">Qty</th>
                    <th className="py-3 font-bold">Total</th>
                    <th className="py-3 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl mx-auto"
                        />
                      </td>
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 font-bold">
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded font-bold hover:bg-blue-700"
                            onClick={() =>
                              onUpdateQuantity(idx, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded font-bold hover:bg-blue-700"
                            onClick={() =>
                              onUpdateQuantity(idx, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-bold">
                        {(item.price * item.quantity).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                      <td className="py-4">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-700"
                          onClick={() => onRemoveFromCart(idx)}
                        >
                          ✖ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-6 mb-6">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl shadow-sm p-4 bg-blue-50 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <p className="text-blue-700 font-semibold">
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-blue-700">
                      {(item.price * item.quantity).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>

                  <button
                    className="mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-700 font-semibold"
                    onClick={() => onRemoveFromCart(idx)}
                  >
                    ✖ Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <span className="text-xl font-bold text-gray-700">
                Grand Total:
              </span>
              <span className="text-2xl font-extrabold text-blue-700">
                {grandTotal.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>

            <button
              onClick={() => navigate("/invoice", { state: { cart } })}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
            >
              Checkout →
            </button>
            <button
              className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-xl font-bold text-lg hover:bg-gray-400 transition"
              onClick={() => (window.location.href = "/")}
            >
              ← Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
