import React, { useState } from 'react';
import { X, Package, Truck, CheckCircle, Clock, MapPin, Search } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [searchTracking, setSearchTracking] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  if (!isOpen) return null;

  const currentOrder = selectedOrder || orders[0];

  const orderStatuses = [
    { title: 'Order Placed', desc: 'Carbon-neutral verification complete' },
    { title: 'In Production', desc: 'Crafting & eco packaging prepared' },
    { title: 'In Transit', desc: 'Shipped via EV electric logistics carrier' },
    { title: 'Out for Delivery', desc: 'Arriving today at destination' },
    { title: 'Delivered', desc: 'Package safely delivered' }
  ];

  const getStatusIndex = (status: string) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'In Production': return 1;
      case 'In Transit': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-750 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Real-Time Logistics
          </span>
          <h2 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-400" />
            Order Tracking & History
          </h2>
        </div>

        {/* Order Selector or Empty State */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            
            {/* Orders Dropdown */}
            {orders.length > 1 && (
              <div className="flex items-center gap-2 bg-stone-850 p-2 rounded-xl border border-stone-800">
                <span className="text-xs font-medium text-stone-400 pl-2">Select Order:</span>
                <select
                  value={currentOrder.id}
                  onChange={(e) => {
                    const found = orders.find((o) => o.id === e.target.value);
                    if (found) setSelectedOrder(found);
                  }}
                  className="bg-stone-800 text-stone-100 text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-700 focus:outline-none flex-1"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} — ${o.total.toFixed(2)} ({o.date})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Current Order Summary Card */}
            <div className="p-4 bg-stone-850 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-stone-400">Order ID:</span>{' '}
                  <strong className="text-stone-100 font-mono text-sm">{currentOrder.id}</strong>
                </div>
                <div className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg font-bold">
                  Tracking: {currentOrder.trackingNumber}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-stone-800">
                <div>
                  <span className="text-stone-400 block text-[11px]">Placed Date</span>
                  <span className="text-stone-200 font-semibold">{currentOrder.date}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Est. Delivery</span>
                  <span className="text-emerald-400 font-semibold">{currentOrder.estimatedDelivery}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Destination</span>
                  <span className="text-stone-200 font-semibold">{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.country}</span>
                </div>
              </div>
            </div>

            {/* Visual Tracking Progress Line */}
            <div className="p-6 bg-stone-850 rounded-2xl border border-stone-800 space-y-6">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Logistics Journey</h4>
              
              <div className="relative pl-6 border-l-2 border-stone-700 space-y-6">
                {orderStatuses.map((st, idx) => {
                  const activeIdx = getStatusIndex(currentOrder.status);
                  const isCompleted = idx <= activeIdx;
                  const isCurrent = idx === activeIdx;

                  return (
                    <div key={st.title} className="relative">
                      {/* Node Icon */}
                      <div
                        className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                          isCompleted
                            ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md shadow-emerald-950'
                            : 'bg-stone-800 text-stone-500 border-stone-700'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      <div className="ml-2">
                        <h5 className={`text-xs font-bold ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-stone-200' : 'text-stone-500'}`}>
                          {st.title} {isCurrent && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded ml-2 font-normal">Active Status</span>}
                        </h5>
                        <p className="text-[11px] text-stone-400 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Item List Preview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase">Package Contents</h4>
              <div className="space-y-2">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-stone-850 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg bg-stone-900" referrerPolicy="no-referrer" />
                      <div>
                        <span className="font-semibold text-stone-200 block">{item.product.name}</span>
                        <span className="text-stone-400 text-[11px]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-100">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <Clock className="w-12 h-12 text-stone-600 mx-auto" />
            <p className="text-sm font-semibold text-stone-300">No recent orders placed yet</p>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Once you complete checkout, your order history and live carbon-neutral tracking link will appear here!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
