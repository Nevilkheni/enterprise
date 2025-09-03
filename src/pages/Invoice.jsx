import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { Download, ArrowLeft, IndianRupee, CheckCircle, Printer, CreditCard, Mail, Phone } from "lucide-react";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();
  
  const {
    cart = [],
    customerDetails = {},
    paymentDetails = {},
    paymentMethod,
    subtotal = 0,
    gst = 0,
    grandTotal = 0
  } = location.state || {};

  const handleDownload = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `Invoice-${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-IN", options);
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `INV-${day}${month}${year}-${random}`;
  };

  const getPaymentMethodDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return {
          method: 'Credit/Debit Card',
          details: `**** **** **** ${paymentDetails.number.slice(-4)}`,
          icon: <CreditCard className="inline h-4 w-4 mr-1" />
        };
      case 'upi':
        return {
          method: 'UPI',
          details: paymentDetails.upiId,
          icon: (
            <svg className="inline h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.5 15.97V8.03h3.03l-1.89-3.39h-3.72L6 8.03h3.48v7.94H6l1.92 3.38h3.72l1.89-3.38h-3.03z"/>
            </svg>
          )
        };
      case 'netbanking':
        return {
          method: 'Net Banking',
          details: paymentDetails.bank,
          icon: (
            <svg className="inline h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
            </svg>
          )
        };
      default:
        return {
          method: 'Unknown',
          details: '',
          icon: null
        };
    }
  };

  const paymentInfo = getPaymentMethodDetails();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0"
    >
      <div className="max-w-4xl mx-auto print:max-w-full">
        <div
          ref={invoiceRef}
          className="bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10 print:hidden">
            <div className="text-6xl font-bold text-gray-400 transform rotate-12">PAID</div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-indigo-700 p-6 sm:p-8 text-white print:bg-gradient-to-r print:from-red-600 print:to-indigo-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">INVOICE</h1>
                <p className="text-red-100">Jyot Enterprise</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-sm text-red-100">
                  Invoice #: {generateInvoiceNumber()}
                </p>
                <p className="text-lg font-semibold">{formatDate()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b print:border-b-2">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">From</h2>
              <p className="font-semibold">Jyot Enterprise</p>
              <p className="text-gray-600">59-60 Vibhag-2, Ghanshyamnagar</p>
              <p className="text-gray-600">Chopati Corner Opp, Varachha, Surat</p>
              <p className="text-gray-600 mt-2">GSTIN: 27ABCDE1234F1Z5</p>
              <p className="text-gray-600">Phone: +91 9426154135</p>
              <p className="text-gray-600">Phone: +91 9375776364</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Bill To</h2>
              <p className="font-semibold">{customerDetails.fullName || 'Customer Name'}</p>
              <p className="text-gray-600">{customerDetails.address || '123 Customer Address'}</p>
              <p className="text-gray-600">
                {customerDetails.city || 'City'}, {customerDetails.state || 'State'} - {customerDetails.zipCode || 'ZIP Code'}
              </p>
              {customerDetails.email && (
                <p className="text-gray-600 mt-2 flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {customerDetails.email}
                </p>
              )}
              {customerDetails.phone && (
                <p className="text-gray-600 flex items-center">
                  <Phone className="h-4 w-4 mr-1" /> +91 {customerDetails.phone}
                </p>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 print:bg-gray-100">
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase w-1/2">
                    Description
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-right">
                    Price
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-center">
                    Qty
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-semibold text-sm uppercase text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        SKU: {item.id || `ITEM${idx + 100}`}
                      </p>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <IndianRupee className="inline h-4 w-4" />
                      {item.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      {item.quantity}
                    </td>
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
                  <div className="text-right font-medium text-gray-700">
                    Subtotal:
                  </div>
                  <div className="text-right">
                    <IndianRupee className="inline h-4 w-4" />
                    {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>

                  <div className="text-right font-medium text-gray-700">
                    GST (18%):
                  </div>
                  <div className="text-right">
                    <IndianRupee className="inline h-4 w-4" />
                    {gst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>

                  <div className="text-right text-lg font-bold text-gray-900 pt-2">
                    Total:
                  </div>
                  <div className="text-right text-lg font-bold text-red-700 pt-2">
                    <IndianRupee className="inline h-5 w-5" />
                    {grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 print:border-t-2">
              <div className="mb-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-green-600 mb-1">Payment Successful</h3>
                <div className="flex justify-center items-center mb-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {paymentInfo.icon}
                    {paymentInfo.method}
                  </span>
                </div>
                {paymentInfo.details && (
                  <p className="text-sm text-gray-600">
                    {paymentInfo.details}
                  </p>
                )}
              </div>
              
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Payment Terms
              </h3>
              <p className="text-sm text-gray-600">
                Payment due upon receipt. Please make checks payable to Jyot Enterprise.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Thank you for your business!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 print:hidden">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <Printer className="w-5 h-5" />
            Print Invoice
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
    </motion.div>
  );
};

export default Invoice;