import React, { useContext, useEffect, useReducer } from "react";

export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            cart = JSON.parse(localCart);
        }

        if (!checkItemInCart(item)) {
            cart.push({
                ...item
            });
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        next();
    }
}

export const removeItemFromCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            cart = JSON.parse(localCart);
        }

        let newCart = cart.filter((cartItem) => {
            return (cartItem.id !== item.id) ? true : false;
        })

        localStorage.setItem("cart", JSON.stringify(newCart));

        next();
    }
}

export const checkItemInCart = (item) => {
    let cart = []
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            cart = JSON.parse(localCart);
        }

        let matchedItems = cart.filter((cartItem, index) => {
            return (cartItem.id === item.id) ? true : false;
        })

        return matchedItems.length > 0 ? true : false;
    }
}

export const getItemsFromCart = () => {
    let cart = []
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            cart = JSON.parse(localCart);
        }

        return cart;
    }
}

export const countItemsInCart = () => {
    let count = 0;
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            count = (JSON.parse(localCart)).length;
        }

        return count;
    }
}

export const emptyCart = (next = () => { }) => {
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            localStorage.setItem("cart", []);
        }

        next();
    }
}

// Creating the Cart Conext here 
const CartContext = React.createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'getCartData':
            return { ...state, cartData: getItemsFromCart() };
        case 'refreshCartData':
            const cartData = getItemsFromCart();
            return { ...state, cartData: cartData, count: cartData.length};
        default:
            return state;
    }
}

const initialState = {
    count: countItemsInCart()
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const value = { cartState: state, cartDispatch: dispatch };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === "undefined") {
        throw new Error('useCart must be within a CountProvider');
    }

    return context;
}