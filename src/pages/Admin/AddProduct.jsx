// import React, { useState } from "react";
// import { db, storage } from "../../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "product", // default category
//   });
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     setMessage("");

//     try {
//       let imageUrl = "";

//       // 1. Upload image if present
//       if (file) {
//         const storageRef = ref(storage, `products/${uuidv4()}-${file.name}`);
//         const snapshot = await uploadBytes(storageRef, file);
//         imageUrl = await getDownloadURL(snapshot.ref);
//       }

//       // 2. Add product to Firestore
//       await addDoc(collection(db, "products"), {
//         ...formData,
//         price: parseFloat(formData.price),
//         image: imageUrl,
//         createdAt: new Date(),
//       });

//       setMessage("✅ Product added successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         category: "product",
//       });
//       setFile(null);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       setMessage("❌ Failed to add product. Check console.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

//       {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           required
//         ></textarea>
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           required
//         />
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         >
//           <option value="product">Product</option>
//           <option value="home">Home</option>
//         </select>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full"
//         />

//         <button
//           type="submit"
//           disabled={uploading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {uploading ? "Uploading..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import { useState } from "react";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Home",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert("Please choose an image!");

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `products/${uuidv4()}_${form.image.name}`);
      const uploadTask = await uploadBytesResumable(imageRef, form.image);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // Save product data to Firestore
      await addDoc(collection(db, "products"), {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        imageUrl: downloadURL,
        createdAt: new Date(),
      });

      alert("✅ Product added!");
      setForm({ name: "", price: "", description: "", category: "Home", image: null });
    } catch (err) {
      console.error("Add Product Error:", err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="your-form-class">
      <input name="name" value={form.name} onChange={handleChange} required />
      <input name="price" value={form.price} onChange={handleChange} required />
      <textarea name="description" value={form.description} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="Home">Home</option>
        <option value="Tech">Tech</option>
      </select>
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}

export default AddProduct;
