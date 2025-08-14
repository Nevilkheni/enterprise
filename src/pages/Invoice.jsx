import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Download, ArrowLeft, IndianRupee } from "lucide-react";

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
    const opt = {
      margin: 0.5,
      filename: `Invoice-${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-IN', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div ref={invoiceRef} className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-indigo-700 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">INVOICE</h1>
                <p className="text-red-100">Tech Enterprise Solutions</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-sm text-red-100">Invoice #: {Math.floor(Math.random() * 90000) + 10000}</p>
                <p className="text-lg font-semibold">{formatDate()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">From</h2>
              <p className="font-semibold">Tech Enterprise Solutions</p>
              <p className="text-gray-600">123 Tech Park, Andheri East</p>
              <p className="text-gray-600">Mumbai, Maharashtra 400069</p>
              <p className="text-gray-600 mt-2">GSTIN: 27ABCDE1234F1Z5</p>
              <p className="text-gray-600">Phone: +91 98765 43210</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Bill To</h2>
              <p className="font-semibold">Customer Name</p>
              <p className="text-gray-600">123 Customer Address</p>
              <p className="text-gray-600">City, State - ZIP Code</p>
              <p className="text-gray-600 mt-2">GSTIN: Customer GSTIN (if applicable)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase w-1/2">Description</th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-right">Price</th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-center">Qty</th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.id || `ITEM${idx + 100}`}</p>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <IndianRupee className="inline h-4 w-4" />
                      {item.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">{item.quantity}</td>
                    <td className="py-4 px-4 sm:px-6 text-right font-medium">
                      <IndianRupee className="inline h-4 w-4" />
                      {(item.price * item.quantity).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right font-medium text-gray-700">Subtotal:</div>
                  <div className="text-right">
                    <IndianRupee className="inline h-4 w-4" />
                    {subtotal.toFixed(2)}
                  </div>
                  
                  <div className="text-right font-medium text-gray-700">GST (18%):</div>
                  <div className="text-right">
                    <IndianRupee className="inline h-4 w-4" />
                    {gst.toFixed(2)}
                  </div>
                  
                  <div className="text-right text-lg font-bold text-gray-900 pt-2">Total:</div>
                  <div className="text-right text-lg font-bold text-red-700 pt-2">
                    <IndianRupee className="inline h-5 w-5" />
                    {grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Payment Terms</h3>
              <p className="text-sm text-gray-600">Payment due upon receipt. Please make checks payable to Tech Enterprise Solutions.</p>
              <p className="text-sm text-gray-600 mt-2">Thank you for your business!</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
            <p>Tech Enterprise Solutions • support@techenterprise.com • +91 98765 43210</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;