"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  restaurant?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, name?: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  deliveryFee: number;
  taxes: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Using persisted state if needed, simpler for now
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate totals
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const deliveryFee = items.length > 0 ? 5.0 : 0;
  const taxes = cartTotal * 0.1;
  const finalTotal = cartTotal + deliveryFee + taxes;

  const addToCart = (
    newItem: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      const quantityToAdd = newItem.quantity || 1;

      if (existingItem) {
        toast.success(`Updated ${newItem.name} quantity in cart`, {
          description: "Delicious choice! 🍔",
        });
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      toast.success(`${newItem.name} added to cart`, {
        description: "Good taste! Check your cart to checkout.",
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      });

      return [...currentItems, { ...newItem, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (id: string, name?: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    if (name) {
      toast.info(`${name} removed from cart`);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  // Hydrate from optional localStorage or just start empty
  useEffect(() => {
    const savedCart = localStorage.getItem("foodie-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foodie-cart", JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        deliveryFee,
        taxes,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
