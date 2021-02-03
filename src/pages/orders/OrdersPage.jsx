import React, { useEffect, useState } from "react";
import "./OrdersPage.style.css";
import { db } from "../../firebase/firebase";
import { useStateValue } from "../../stateMenagement/StateProvider";
import Order from "../../components/order/order.component";

function OrdersPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((x) => ({
              id: x.id,
              data: x.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders-page">
      <h1>Your orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
