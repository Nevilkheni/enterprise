
// import { useState } from "react";
// import { db, storage } from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

// function AddProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "Home",
//     image: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setForm((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.image) return alert("Please choose an image!");

//     setLoading(true);

//     try {
//       // Upload image to Firebase Storage
//       const imageRef = ref(storage, `products/${uuidv4()}_${form.image.name}`);
//       const uploadTask = await uploadBytesResumable(imageRef, form.image);
//       const downloadURL = await getDownloadURL(uploadTask.ref);

//       // Save product data to Firestore
//       await addDoc(collection(db, "products"), {
//         name: form.name,
//         price: parseFloat(form.price),
//         description: form.description,
//         category: form.category,
//         imageUrl: downloadURL,
//         createdAt: new Date(),
//       });

//       alert("✅ Product added!");
//       setForm({ name: "", price: "", description: "", category: "Home", image: null });
//     } catch (err) {
//       console.error("Add Product Error:", err);
//       alert("❌ Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="your-form-class">
//       <input name="name" value={form.name} onChange={handleChange} required />
//       <input name="price" value={form.price} onChange={handleChange} required />
//       <textarea name="description" value={form.description} onChange={handleChange} required />
//       <select name="category" value={form.category} onChange={handleChange}>
//         <option value="Home">Home</option>
//         <option value="Tech">Tech</option>
//       </select>
//       <input type="file" name="image" accept="image/*" onChange={handleChange} required />
//       <button type="submit" disabled={loading}>
//         {loading ? "Uploading..." : "Add Product"}
//       </button>
//     </form>
//   );
// }

// export default AddProduct;
