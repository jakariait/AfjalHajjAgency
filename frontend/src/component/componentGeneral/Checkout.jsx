import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

// Stores
import useCartStore from "../../store/useCartStore.js";
import useAuthUserStore from "../../store/AuthUserStore.js";

// Custom Components
import AddressForm from "./AddressForm.jsx";
import ShippingOptions from "./ShippingOptions.jsx";
import OrderReview from "./OrderReview.jsx";
import CouponSection from "./CouponSection.jsx";
import RewardPoints from "./RewardPoints.jsx";
import DeliveryMethod from "./DeliveryMethod.jsx";
import OrderSummary from "./OrderSummary.jsx";
import CheckoutHeader from "./CheckoutHeader.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import AbandonedCartTracker from "./AbandonedCartTracker.jsx";

const Checkout = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Store values
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuthUserStore();

  // Coupon & Reward
  const [rewardPointsUsed, setRewardPointsUsed] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Shipping state
  const [selectedShipping, setSelectedShipping] = useState({
    name: "",
    value: 0,
  });

  // Payment Method state
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  // Free Delivery
  const [freeDelivery, setFreeDelivery] = useState(null);

  // Vat Percentage
  const [vatPercentage, setVatPercentage] = useState(null);

  // Shipping Details Handler
  const [addressData, setAddressData] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Handle data received from AddressForm
  const handleAddressChange = (data) => {
    setAddressData(data);
  };

  const handleRewardPointsChange = (value) => {
    setRewardPointsUsed(value);
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch free delivery threshold
  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getFreeDeliveryAmount`);
        if (res.data?.success) {
          setFreeDelivery(res.data.data.value);
        }
      } catch (err) {
        console.error("Failed to fetch free delivery amount", err);
      }
    };

    fetchAmount();
  }, []);

  // Price Calculations
  const totalAmount = cart.reduce((total, item) => {
    const price =
      item.discountPrice > 0 ? item.discountPrice : item.originalPrice;
    return total + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formattedTotalAmount = (amount) => Number(amount).toLocaleString();

  const actualShippingCost =
    freeDelivery > 1 && totalAmount >= freeDelivery
      ? 0
      : selectedShipping.value;

  let discount = appliedCoupon?.discountAmount || 0;

  // Calculate total amount after reward points and coupon discount
  const amountAfterDiscounts = totalAmount - rewardPointsUsed - discount;

  // --- VAT Calculation (e.g., 5%) ---
  const vatAmount = (amountAfterDiscounts * vatPercentage) / 100;

  useEffect(() => {
    const fetchVatAmount = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getVatPercentage`);
        if (res.data?.success) {
          setVatPercentage(res.data.data.value);
        }
      } catch (err) {
        console.error("Failed to fetch VAT Percentage", err);
      }
    };

    fetchVatAmount();
  }, []);

  // Data Layer for Initiat Checkout

  useEffect(() => {
    if (cart.length > 0) {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "BDT",
          value: totalAmount,
          items: cart.map((item) => ({
            item_name: item.name,
            item_id: item.contentId,
            price:
              item.discountPrice > 0 ? item.discountPrice : item.originalPrice,
            quantity: item.quantity,
            item_variant: item.variantId || "Default",
          })),
        },
      });
    }
  }, [cart, totalAmount]);

  if (vatPercentage === null || freeDelivery === null) return null;

  // --- Grand Total ---
  const grandTotal = amountAfterDiscounts + vatAmount + actualShippingCost;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsProcessingOrder(true); // Disable button immediately

    const orderPayload = {
      shippingInfo: {
        fullName: addressData.fullName,
        mobileNo: addressData.phone,
        email: addressData.email,
        address: addressData.address,
      },
      shippingId: selectedShipping.id,
      items: cart.map((item) => {
        const baseItem = {
          productId: item.productId,
          quantity: item.quantity,
        };
        if (item.variantId && item.variantId !== "Default") {
          baseItem.variantId = item.variantId;
        }
        return baseItem;
      }),
      promoCode: appliedCoupon?.code || null,
      paymentMethod,
    };

    if (user?._id) {
      orderPayload.userId = user._id;
    }

    // // ---- Handle bKash Checkout ----
    if (paymentMethod === "bkash") {
      try {
        const createRes = await axios.post(`${apiUrl}/bkashcreate`, {
          amount: grandTotal.toFixed(2), // round to 2 decimal places
          payerReference: user?.phone || "guestUser",
          callbackURL: `${window.location.origin}/bkash-callback`,
        });

        if (createRes.data && createRes.data.bkashURL) {
          localStorage.setItem(
            "bkash_order_payload",
            JSON.stringify(orderPayload),
          );
          window.location.href = createRes.data.bkashURL;
          return;
        } else {
          showSnackbar("Failed to initiate bKash payment", "error");
        }
      } catch (err) {
        console.error(err);
        showSnackbar("bKash payment initialization failed", "error");
      } finally {
        setIsProcessingOrder(false); // Re-enable button
      }
      return;
    }

    // ---- Normal COD Flow ----

    try {
      const res = await axios.post(`${apiUrl}/orders`, orderPayload);

      if (res.data.success) {
        setOrderPlaced(true);

        clearCart();
        showSnackbar("Order placed successfully!", "success");

        setTimeout(() => {
          navigate(`/thank-you/${res.data.order.orderNo}`);
        }, 300); // delay by 300ms
      } else {
        showSnackbar(res.data.message || "Failed to place order.", "error");
      }
    } catch {
      showSnackbar("Something went wrong. Please try again later.", "error");
    } finally {
      setIsProcessingOrder(false); // Re-enable button
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="checkout-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 0 L75 25 L50 50 L25 25 Z M50 50 L75 75 L50 100 L25 75 Z M0 25 L25 50 L0 75 L-25 50 Z M100 25 L125 50 L100 75 L75 50 Z"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="#059669"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#checkout-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative xl:container xl:mx-auto p-4 md:p-6 py-12">
        {/* Checkout Header */}
        <div className="mb-8">
          <CheckoutHeader user={user} />
        </div>

        <form onSubmit={handleOrderSubmit}>
          <div className="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-2">
            {/* Left Column - Address & Shipping */}
            <div className="space-y-6">
              {/* Address Form Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                {/* Top Decorative Border */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <AddressForm user={user} onAddressChange={handleAddressChange} />
              </div>

              {/* Shipping Options Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <ShippingOptions onShippingChange={setSelectedShipping} />
              </div>

              {/* Delivery Method Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <DeliveryMethod
                  freeDelivery={freeDelivery}
                  formattedTotalAmount={formattedTotalAmount}
                />
              </div>

              {/* Payment Method Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <PaymentMethod
                  selectedMethod={paymentMethod}
                  setSelectedMethod={setPaymentMethod}
                />
              </div>
            </div>

            {/* Right Column - Order Review */}
            <div className="space-y-6">
              {/* Order Review Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <OrderReview
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  formattedTotalAmount={formattedTotalAmount}
                />
              </div>

              {/* Coupon Section */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <CouponSection
                  orderAmount={totalAmount}
                  setAppliedCouponGlobal={setAppliedCoupon}
                />
              </div>

              {/* Reward Points Section */}
              {user && (
                <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50">
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                  </div>

                  <RewardPoints
                    availablePoints={user.rewardPoints}
                    points={rewardPointsUsed}
                    onPointsChange={handleRewardPointsChange}
                  />
                </div>
              )}

              {/* Order Summary Section */}
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 border-2 border-emerald-400">
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/50 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/50 rounded-br"></div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-white/60 to-amber-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>

                <OrderSummary
                  totalItems={totalItems}
                  totalAmount={totalAmount}
                  rewardPointsUsed={rewardPointsUsed}
                  actualShippingCost={actualShippingCost}
                  grandTotal={grandTotal}
                  discount={discount}
                  appliedCoupon={appliedCoupon}
                  formattedTotalAmount={formattedTotalAmount}
                  showRewardPoints={!!user}
                  vatAmount={vatAmount}
                  vatPercentage={vatPercentage}
                />
              </div>

              {/* Place Order Button */}
              <button
                className={`
                  relative w-full px-8 py-4 rounded-xl font-bold text-lg shadow-xl
                  transition-all duration-300 overflow-hidden group
                  ${
                  isProcessingOrder || cart.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 hover:shadow-2xl hover:scale-[1.02]"
                }
                `}
                disabled={isProcessingOrder || cart.length === 0}
              >
                <div className="absolute  inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative cursor-pointer flex items-center justify-center gap-3">
                  {isProcessingOrder ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>প্রক্রিয়াকরণ...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {paymentMethod === "cash_on_delivery"
                          ? "অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)"
                          : "পেমেন্টে এগিয়ে যান (bKash)"}
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Abandoned Cart Tracker */}
      <AbandonedCartTracker
        addressData={addressData}
        cart={cart}
        totalAmount={grandTotal}
        user={user}
        apiUrl={apiUrl}
        orderPlaced={orderPlaced}
      />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default Checkout;