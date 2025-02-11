import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const OrderList = () => {
  const { fetchAllOrders, orders, loading, error, updateOrderStatus } =
    useShop();
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    if (orders.length === 0) fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    const response = await updateOrderStatus(orderId, newStatus);
    if (response.success) {
      fetchAllOrders();
    }
    setUpdatingOrderId(null);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Order Management
      </h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No orders found.</p>
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
              updatingOrderId={updatingOrderId}
            />
          ))
        )}
      </div>
    </div>
  );
};

const OrderItem = ({ order, onStatusChange, updatingOrderId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  useEffect(() => {
    setCurrentStatus(order.status);
  }, [order.status]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const handleStatusUpdate = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(order._id, newStatus);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-4 flex-grow cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-sm font-medium text-gray-900">
              #{order._id.slice(-6)}
            </span>
            <span
              className={`px-2 inline-flex text-xs font-semibold rounded-full ${statusColors[currentStatus]}`}
            >
              {currentStatus}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">
              ${(order.total / 100).toFixed(2)}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="focus:outline-none"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div className="text-sm text-gray-600">
              <p>{order.shippingInfo.fullName}</p>
              <p>{order.shippingInfo.email}</p>
              <p>{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.zipCode}, ${order.shippingInfo.country}`}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Items:</h4>
              {order.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {item.name} - {item.size} (x{item.quantity})
                </p>
              ))}
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <div className="w-48">
                <Select
                  value={currentStatus}
                  onValueChange={handleStatusUpdate}
                  disabled={updatingOrderId === order._id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {updatingOrderId === order._id && (
                <Loader2 className="animate-spin h-5 w-5 text-gray-600" />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderList;
