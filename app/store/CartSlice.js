import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: null,
    cart: [],
    totalProduct: 0,
    totalDiscount: 0,
    totalPrice: 0,
    onlyBuy: null,
    wishes: [],
    results: [],
    edittedImage: [],
    noAuthBuy: false,

    // ui and auth properties
    isLogged: false,
    user: null,
    notificationItem: null,
    viewer: false,
  },
  reducers: {
    addItem(state, action) {
      const newItem = {
        discount:
          typeof action.payload.discount === "number"
            ? action.payload.discount
            : Number(action.payload.discount.replaceAll(" ", "")),
        id: action.payload.id,
        cartItemId:
          action.payload.id +
          (action.payload.color || "") +
          (action.payload.size || ""),
        image: action.payload.image,
        name: action.payload.name,
        price:
          typeof action.payload.price === "number"
            ? action.payload.price
            : Number(action.payload.price.replaceAll(" ", "")),
        rating: action.payload.rating,
        specs: action.payload.specs,
        proType: action.payload.proType,
        quantity: action.payload.quantity || 1,
        totalPrice:
          typeof action.payload.price === "number"
            ? action.payload.price * (action.payload.quantity || 1)
            : Number(action.payload.price.replaceAll(" ", "")) *
              (action.payload.quantity || 1),
        totalDiscount:
          typeof action.payload.discount === "number"
            ? action.payload.discount * (action.payload.quantity || 1)
            : Number(action.payload.discount.replaceAll(" ", "")) *
              (action.payload.quantity || 1),
        color: action.payload.color || null,
        size: action.payload.size || null,
      };

      const existingItem = state.cart.find(
        (item) => item.cartItemId === newItem.cartItemId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.totalPrice;
        existingItem.totalDiscount += newItem.totalDiscount;
        state.totalDiscount += newItem.totalDiscount;
        state.totalPrice += newItem.totalPrice;
      } else {
        const updatedCart = [newItem, ...state.cart];
        state.cart = updatedCart;
        state.totalProduct += 1;
        state.totalDiscount += newItem.totalDiscount;
        state.totalPrice += newItem.totalPrice;
      }
    },
    removeItem(state, action) {
      const newItem = action.payload.product || action.payload;
      const existingItem = state.cart.find(
        (item) => item.cartItemId === newItem.cartItemId
      );

      if (!action.payload.delete) {
        existingItem.quantity--;
        existingItem.totalDiscount -= newItem.discount;
        existingItem.totalPrice -= newItem.price;
        state.totalDiscount -= newItem.discount;
        state.totalPrice -= newItem.price;
      } else {
        state.cart = state.cart.filter(
          (item) => item.cartItemId !== newItem.cartItemId
        );
        state.totalDiscount -= existingItem.totalDiscount;
        state.totalPrice -= existingItem.totalPrice;
        state.totalProduct -= 1;
      }
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    setOnlyBuyItem(state, action) {
      if (action.payload) {
        const newItem = {
          discount:
            typeof action.payload?.discount === "number"
              ? action.payload.discount
              : Number(action.payload.discount.replaceAll(" ", "")),
          id: action.payload.id,
          cartItemId:
            action.payload.id +
            (action.payload.color || "") +
            (action.payload.size || ""),
          image: action.payload.image,
          name: action.payload.name,
          price:
            typeof action.payload.price === "number"
              ? action.payload.price
              : Number(action.payload.price.replaceAll(" ", "")),
          rating: action.payload.rating,
          specs: action.payload.specs,
          proType: action.payload.proType,
          quantity: action.payload.quantity || 1,
          totalPrice:
            typeof action.payload.price === "number"
              ? action.payload.price * (action.payload.quantity || 1)
              : Number(action.payload.price.replaceAll(" ", "")) *
                (action.payload.quantity || 1),
          totalDiscount:
            typeof action.payload.discount === "number"
              ? action.payload.discount * (action.payload.quantity || 1)
              : Number(action.payload.discount.replaceAll(" ", "")) *
                (action.payload.quantity || 1),
          color: action.payload.color || "",
          size: action.payload.size || "",
        };

        state.onlyBuy = [newItem];
      } else {
        state.onlyBuy = action.payload;
      }
    },
    setNotificationItem(state, action) {
      state.notificationItem = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setEdittedImage(state, action) {
      state.edittedImage = action.payload;
    },
    setClearCart(state) {
      state.cart = [];
      state.totalDiscount = 0;
      state.totalPrice = 0;
      state.onlyBuy = null
    },
    setLogged(state, action) {
      state.isLogged = action.payload;
    },
    manageWish(state, action) {
      const existingWish = state.wishes.find(
        (wish) => wish.id === action.payload.id
      );
      if (!existingWish) {
        state.wishes.push(action.payload);
      } else {
        state.wishes = state.wishes.filter(
          (wish) => wish.id !== existingWish.id
        );
      }
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setViewer(state, action){
      state.viewer = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    setNoAuthBuy(state, action){
      state.noAuthBuy = action.payload
    } 
  },
});

export const cartAction = CartSlice.actions;

export default CartSlice;