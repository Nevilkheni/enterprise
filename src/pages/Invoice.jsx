import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const invoiceRef = useRef();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const handleDownload = () => {
    const element = invoiceRef.current;
    html2pdf().from(element).set({
      margin: 0.5,
      filename: `Invoice-${new Date().toISOString().split("T")[0]}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 flex flex-col items-center">
      <div ref={invoiceRef} className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Invoice</h1>

        <div className="flex justify-between mb-6 text-sm text-gray-600">
          <div>
            <p className="font-bold ">Tech Enterprise</p>
            <p>123 Main Street</p>
            <p>City, Country</p>
            <p>GSTIN: 27ABCDE1234F1Z5</p>
          </div>
          <div className="text-right">
            <p>Date: {new Date().toLocaleDateString()}</p>
            {/* <p>Invoice #: {Math.floor(Math.random() * 100000)}</p> */}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 font-semibold border-b pb-2 mb-2 text-sm sm:text-base">
          <span className="col-span-2">Item</span>
          <span className="hidden sm:block">Price</span>
          <span className="text-center">Qty</span>
          <span className="text-right sm:col-span-2">Subtotal</span>
        </div>

        {cart.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 sm:grid-cols-6 gap-4 text-sm sm:text-base mb-2">
            <span className="col-span-2">{item.name}</span>
            <span className="hidden sm:block">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
            <span className="text-center">{item.quantity}</span>
            <span className="text-right sm:col-span-2">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}

        <div className="border-t mt-6 pt-4 text-right text-sm sm:text-base">
          <p className="mb-1">
            Subtotal: <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="mb-1">
            GST (18%): <span className="font-semibold">₹{gst.toFixed(2)}</span>
          </p>
          <p className="text-xl font-bold text-blue-700 mt-2">
            Total: ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          📄 Download Invoice
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-xl font-bold hover:bg-gray-400 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Invoice;
