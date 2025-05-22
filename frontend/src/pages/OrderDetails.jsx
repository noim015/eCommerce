import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Order Placed Successfully!</h2>
      <p className="mb-4"><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Pending Payment'}</p>
      <p><strong>Total:</strong> ${order.totalPrice}</p>
    </div>
  );
};

export default OrderDetails;
