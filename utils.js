//include all requests to the server;
//login api -> send a request to the server;
export const login = credential => {
    //config the request object;
    const { username, password } = credential;
    const loginUrl = `/login?username=${username}&password=${password}`;

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Failed to login.");
        }
    });
}

//fetch foodlist api;
export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get restaurants");
        }

        return response.json();
    });
};

//fetch menu api;
export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get menus");
        }

        return response.json();
    });
};

//fetch cart api;
export const getCart = () => {
    return fetch("/cart").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get shopping cart data");
        }

        return response.json();
    });
};

//chechout api;
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to checkout");
        }
    });
};

//add item to cart api;
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};

