import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import ProductGallery from "./ProductGallery.jsx";
import ProductAddToCart from "./ProductAddToCart.jsx";
import BuyNowButton from "./BuyNowButton.jsx";
import ImageComponentWithCompression from "./ImageComponentWithCompression.jsx";

// Memoize the formatted price function
const formatPrice = (price) => {
  if (isNaN(price)) return price;
  return price.toLocaleString();
};

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const calculateDiscountPercentage = (
    priceBeforeDiscount,
    priceAfterDiscount,
  ) => {
    if (
      !priceBeforeDiscount ||
      !priceAfterDiscount ||
      priceBeforeDiscount <= priceAfterDiscount
    )
      return 0;
    const discountAmount = priceBeforeDiscount - priceAfterDiscount;
    return Math.ceil((discountAmount / priceBeforeDiscount) * 100);
  };

  return (
    <div>
      {products.filter((product) => product.isActive).length === 0 ? (
        <div className="text-center py-20">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-full flex items-center justify-center text-6xl animate-float">
              🛒
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
              0
            </div>
          </div>
          <Typography variant="h5" className="font-bold text-emerald-900 mb-3">
            কোনো পণ্য পাওয়া যায়নি
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-6">
            শীঘ্রই নতুন পণ্য যুক্ত করা হবে। আমাদের সাথেই থাকুন।
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {/*Product Display Section*/}
          {products.map((product) => (
            <div
              key={product.slug}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-emerald-100/50 hover:border-amber-300/50 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.slug)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id={`product-card-pattern-${product.slug}`}
                      x="0"
                      y="0"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M30 0 L45 15 L30 30 L15 15 Z"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="10"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#product-card-pattern-${product.slug})`}
                  />
                </svg>
              </div>

              {/* Top Decorative Border - Animated Shimmer */}
              <div className="relative h-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>

              {/* Product Image */}
              <Link to={`/product/${product.slug}`}>
                <div className="relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <ImageComponentWithCompression
                    imageName={product.thumbnailImage}
                    className="w-full aspect-square object-cover"
                    altName={product.name}
                    skeletonHeight={250}
                    width={600}
                    height={600}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>

              {/* Product Content */}
              <div className="p-4">
                {/* Product Name */}
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-sm md:text-base font-semibold text-emerald-900 mb-3 hover:text-amber-600 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] text-center">
                    {product.name}
                  </h3>
                </Link>

                {/* Price Section */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {/* Base Price */}
                  {product.variants?.length ? (
                    product.variants[0].discount > 0 ? (
                      <div className="text-sm text-gray-500 line-through">
                        ৳{formatPrice(Number(product.variants[0].price))}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-emerald-700">
                        ৳{formatPrice(Number(product.variants[0].price))}
                      </div>
                    )
                  ) : product.finalDiscount > 0 ? (
                    <div className="text-sm text-gray-500 line-through">
                      ৳{formatPrice(Number(product.finalPrice))}
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-emerald-700">
                      ৳{formatPrice(Number(product.finalPrice))}
                    </div>
                  )}

                  {/* Discount Price */}
                  {product.variants?.length
                    ? product.variants[0].discount > 0 && (
                    <div className="text-lg font-bold text-red-600">
                      ৳{formatPrice(Number(product.variants[0].discount))}
                    </div>
                  )
                    : product.finalDiscount > 0 && (
                    <div className="text-lg font-bold text-red-600">
                      ৳{formatPrice(Number(product.finalDiscount))}
                    </div>
                  )}
                </div>

                {/* Buy Now Button */}
                <div className="flex gap-2 justify-center items-center">
                  <BuyNowButton product={product} />
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10">
                {product.variants?.length > 0
                  ? product.variants[0].discount > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-md opacity-50 animate-pulse"></div>
                    <span className="relative flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 text-white text-xs md:text-sm font-bold rounded-full shadow-lg">
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      {calculateDiscountPercentage(
                        product.variants[0].price,
                        product.variants[0].discount
                      )}
                      % ছাড়
                        </span>
                  </div>
                )
                  : product.finalDiscount > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-md opacity-50 animate-pulse"></div>
                    <span className="relative flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 text-white text-xs md:text-sm font-bold rounded-full shadow-lg">
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      {calculateDiscountPercentage(
                        product.finalPrice,
                        product.finalDiscount
                      )}
                      % ছাড়
                        </span>
                  </div>
                )}
              </div>

              {/* Quick View Button */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => handleOpen(product)}
                  className={`
                    relative p-2.5 md:p-3 bg-white rounded-full shadow-lg 
                    hover:bg-emerald-500 hover:text-white 
                    transition-all duration-300 
                    ${hoveredProduct === product.slug ? 'scale-110 rotate-12' : 'scale-100'}
                    group/btn
                  `}
                  aria-label="Quick View"
                >
                  <FaEye className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  {/* Tooltip */}
                  <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    দ্রুত দেখুন
                  </span>
                </button>
              </div>

              {/* Card Decorative Corners */}
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-200/30 rounded-bl group-hover:border-amber-400/50 transition-colors duration-300"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-200/30 rounded-br group-hover:border-amber-400/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <Dialog
          open={Boolean(selectedProduct)}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            className: "rounded-3xl overflow-hidden border-2 border-emerald-200",
          }}
        >
          {/* Modal Header with Decorative Border */}
          <div className="relative h-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>

          <DialogActions className="bg-gradient-to-r from-emerald-50 to-amber-50 px-6 py-3">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                <FaShoppingCart className="text-amber-600" />
                পণ্যের বিস্তারিত
              </h3>
              <Button
                onClick={handleClose}
                variant="contained"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full px-6"
                sx={{
                  background: 'linear-gradient(to right, #059669, #047857)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #047857, #065f46)',
                  },
                }}
              >
                বন্ধ করুন
              </Button>
            </div>
          </DialogActions>

          <DialogContent className="bg-gradient-to-br from-emerald-50/30 via-white to-amber-50/30 p-6">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
              {/* Product Gallery */}
              <div className="relative">
                <ProductGallery
                  images={selectedProduct.images}
                  discount={calculateDiscountPercentage(
                    selectedProduct.finalPrice,
                    selectedProduct.finalDiscount
                  )}
                  zoom={false}
                />
                {/* Decorative corners on gallery */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
              </div>

              {/* Product Details */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                <ProductAddToCart product={selectedProduct} />
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
              </div>
            </div>
          </DialogContent>

          {/* Modal Footer Decorative Border */}
          <div className="relative h-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>
          </div>
        </Dialog>
      )}

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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Smooth hover effect for cards */
        .group:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default ProductList;