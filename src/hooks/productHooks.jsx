

import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const PRODUCTS_CACHE_KEY = "cached_products";
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 min

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    let cachedData = null;
    try {
      cachedData = JSON.parse(localStorage.getItem(PRODUCTS_CACHE_KEY));
    } catch {
      localStorage.removeItem(PRODUCTS_CACHE_KEY); // fix: clear corrupt cache
    }

    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < CACHE_EXPIRY_TIME) {
      setProducts(cachedData.data);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let productsQuery = collection(db, "allProducts");
      if (options.sortBy) {
        productsQuery = query(
          productsQuery,
          orderBy(options.sortBy, options.sortOrder || "asc")
        );
      }
      if (options.limit) {
        productsQuery = query(productsQuery, limit(options.limit));
      }

      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);

      localStorage.setItem(
        PRODUCTS_CACHE_KEY,
        JSON.stringify({ data: productsData, timestamp: now })
      );
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);

      // fallback: cached data agar available ho
      if (cachedData?.data) {
        setProducts(cachedData.data);
      }
    } finally {
      setLoading(false);
    }
  }, [options.sortBy, options.sortOrder, options.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refreshProducts = useCallback(() => {
    localStorage.removeItem(PRODUCTS_CACHE_KEY);
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refreshProducts,
    isEmpty: products.length === 0 && !loading,
  };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        let cachedProducts = null;
        try {
          cachedProducts = JSON.parse(localStorage.getItem(PRODUCTS_CACHE_KEY));
        } catch {
          localStorage.removeItem(PRODUCTS_CACHE_KEY);
        }

        if (cachedProducts?.data) {
          const cachedProduct = cachedProducts.data.find(
            (p) => p.id === productId
          );
          if (cachedProduct) {
            setProduct(cachedProduct);
            setLoading(false);
            return;
          }
        }

        const productsQuery = collection(db, "allProducts");
        const querySnapshot = await getDocs(productsQuery);
        const foundProduct = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((p) => p.id === productId);

        setProduct(foundProduct || null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
