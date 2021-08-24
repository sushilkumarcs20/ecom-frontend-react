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

export const emptyCart = (next) => {
    if (typeof window !== undefined) {
        let localCart = localStorage.getItem("cart");
        if (localCart) {
            localStorage.setItem("cart", []);
        }

        next();
    }
}