export const initialState = {
  basket: [],
  user: null,
};

// Selector to itterate
export const totalPriceToPay = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // idx --> find the first (and hopefully the only one) item in the array of baskets that matches. using findIndex to select the first item in our current( about to be old) state of the basket so it won't remove all the items with the coresponding ID/Key z.B laptop/wardrobe/monitor
      const idx = state.basket.findIndex(
        (basketItem) => basketItem.key === action.id
      );

      // using let! setting a new state of the basket after removing the item at that current index position that we wanted to remove
      let newBasket = [...state.basket];

      // if found in basket, it means it exists. just a check
      if (idx >= 0) {
        newBasket.splice(idx, 1);
      } else {
        alert(`Cant remove product '(id: ${action.id})' as its not in basket!`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      // setting the user according to the dispatched action, where we import this line of code, = sign in page.
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;

// const reducer = (state, action) => {
//   console.log(action);
//   switch (action.type) {
//     case "ADD_TO_BASKET":
//       return {
//         ...state,
//         basket: [...state.basket, action.item],
//       };

//     case "EMPTY_BASKET":
//       return {
//         ...state,
//         basket: [],
//       };

//     case "REMOVE_FROM_BASKET":
//       const index = state.basket.findIndex(
//         (basketItem) => basketItem.id === action.id
//       );
//       let newBasket = [...state.basket];

//       if (index >= 0) {
//         newBasket.splice(index, 1);
//       } else {
//         console.warn(
//           `Cant remove product (id: ${action.id}) as its not in basket!`
//         );
//       }

//       return {
//         ...state,
//         basket: newBasket,
//       };

//     case "SET_USER":
//       return {
//         ...state,
//         user: action.user,
//       };

//     default:
//       return state;
//   }
// };

// export default reducer;
