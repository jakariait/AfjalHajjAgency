import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import useProductStore from "../../store/useProductStore.js";
import GeneralInfoStore from "../../store/GeneralInfoStore.js";
import Skeleton from "react-loading-skeleton";
import LazySocialShareButtons from "./LazySocialShareButtons.jsx";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import ProductGallery from "./ProductGallery.jsx";
import ProductAddToCart from "./ProductAddToCart.jsx";
import ProductBreadcrumbs from "./ProductBreadcrumbs.jsx";
import ProductDetailsSkeleton from "../skeleton/ProductDetailsSkeleton.jsx";
const SimilarProducts = lazy(() => import("./SimilarProducts.jsx"));
const YouTubeEmbed = lazy(() => import("./YouTubeEmbed.jsx"));
const RecentlyViewedProducts = lazy(
  () => import("./RecentlyViewedProducts.jsx"),
);

const ProductDetails = () => {
  const hasPushedRef = useRef(false);

  const { fetchProductBySlug, product, loading, error, resetProduct } =
    useProductStore();

  const { GeneralInfoList } = GeneralInfoStore();
  const { slug } = useParams();

  const [currentProductSlug, setCurrentProductSlug] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (slug !== currentProductSlug) {
      // Reset product state and show loading
      resetProduct(); // Clear previous product data
      setCurrentProductSlug(slug);
      fetchProductBySlug(slug);
    }
  }, [slug, currentProductSlug, fetchProductBySlug, resetProduct]);

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

  const location = useLocation();
  const url = `${window.location.origin}${location.pathname}`;
  const title = product?.name;

  const discountPercentage =
    product?.finalPrice && product?.finalDiscount
      ? calculateDiscountPercentage(product.finalPrice, product.finalDiscount)
      : 0;

  // Function to sanitize/remove editor-specific tags like ql-ui
  const cleanHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove Quill editor-only UI elements
    doc.querySelectorAll(".ql-ui").forEach((el) => el.remove());

    return doc.body.innerHTML;
  };

  // Data layer for View Content
  useEffect(() => {
    if (!product || hasPushedRef.current) return;

    const price =
      product.finalDiscount > 0 ? product.finalDiscount : product.finalPrice;

    const discount =
      product.finalDiscount > 0
        ? product.finalPrice - product.finalDiscount
        : 0;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: price,
        items: [
          {
            item_id: product.productId,
            item_name: product.name,
            currency: "BDT",
            discount,
            item_variant: "Default",
            price,
            quantity: 1,
          },
        ],
      },
    });

    hasPushedRef.current = true;
  }, [product]);

  useEffect(() => {
    if (!product?._id) return;

    // Get existing list or empty array
    let viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

    // Remove if already exists (avoid duplicates)
    viewed = viewed.filter((item) => item._id !== product._id);

    // Add new one at beginning
    viewed.unshift({
      _id: product._id,
      name: product.name,
      isActive: product.isActive,
      category: product.category,
      finalDiscount: product.finalDiscount,
      finalPrice: product.finalPrice,
      productId: product.productId,
      slug: product.slug,
      variants: product.variants,
      finalStock: product.finalStock,
      flags: product.flags,
      images: product.images,
      thumbnailImage: product.thumbnailImage,
    });

    // Limit to 5 items
    viewed = viewed.slice(0, 5);

    // Save back
    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
    setRecentlyViewed(viewed);
  }, [product]);

  if (loading || product?.slug !== slug) {
    return <ProductDetailsSkeleton />; // Loading message while new product data is being fetched
  }


  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="detail-pattern"
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
          <rect width="100%" height="100%" fill="url(#detail-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative xl:container xl:mx-auto p-4 md:p-6 py-12">
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative bg-red-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg mb-1">
                    কিছু সমস্যা হয়েছে
                  </h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {product && (
          <div className="space-y-8">
            {/*Seo Meta Data*/}
            <title>{`${product?.name || product?.metaTitle} | ${GeneralInfoList?.CompanyName}`}</title>
            <meta name="description" content={product?.metaDescription} />
            <meta name="keywords" content={product.metaKeywords.join(", ")} />
            <meta
              property="og:title"
              content={`${product?.name || product?.metaTitle} | ${GeneralInfoList?.CompanyName}`}
            />
            <meta property="og:description" content={product?.metaDescription} />
            <meta property="og:image" content={product?.thumbnailImage} />
            <meta property="og:url" content={window.location.href} />

            {/*BreadCrumbs*/}
            <ProductBreadcrumbs product={product} />

            {/* Main Product Section */}
            <div className="md:grid md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-9 gap-8">
              {/* Product Gallery */}
              <div className="md:col-span-4 lg:col-span-6 xl:col-span-5">
                <div className="relative bg-white rounded-2xl shadow-lg p-4 border-2 border-emerald-100/50 hover:border-amber-300/50 transition-all duration-500">
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

                  <ProductGallery
                    images={product.images}
                    discount={discountPercentage}
                    productName={product.name}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 pt-4 md:pt-0">
                <div className="relative bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100/50 h-full">
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

                  <div className="space-y-4">
                    <ProductAddToCart product={product} />

                    {/* Social Share Buttons */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-200/50">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">শেয়ার করুন</p>
                        <LazySocialShareButtons url={url} title={title} />
                      </div>
                    </div>

                    {/* Product Code */}
                    {product.productCode && (
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-200/50">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">পণ্য কোড</p>
                          <p className="font-bold text-emerald-900">
                            {product.productCode}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Short Description */}
                    {product.shortDesc && (
                      <div className="p-4 bg-gradient-to-br from-emerald-50/50 to-amber-50/50 rounded-xl border border-emerald-200/30">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {product.shortDesc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Video Section */}
            {product.videoUrl && (
              <div className="relative">
                <div className="max-w-2xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
                      <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
                      <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
                      <span className="text-3xl">📹</span>
                      <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
                      <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
                      <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-transparent"></div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-emerald-900">
                      পণ্যের ভিডিও
                    </h3>
                  </div>

                  <div className="relative bg-white rounded-2xl shadow-xl p-4 border-2 border-emerald-200/50">
                    {/* Decorative corners */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>

                    <Suspense
                      fallback={
                        <div className="w-full">
                          <div className="aspect-video">
                            <Skeleton className="w-full h-full rounded-xl" />
                          </div>
                        </div>
                      }
                    >
                      <YouTubeEmbed videoUrl={product.videoUrl} />
                    </Suspense>
                  </div>
                </div>
              </div>
            )}

            {/* Product Details Accordions */}
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Description Accordion */}
              {product.longDesc && (
                <div className="relative bg-white rounded-2xl shadow-lg border-2 border-emerald-100/50 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  </div>

                  <Accordion
                    defaultExpanded
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                      width: "100%",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <ExpandMoreIcon className="text-emerald-700" />
                        </div>
                      }
                      className="px-6 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <Typography
                          component="span"
                          className="font-bold text-emerald-900 text-lg"
                        >
                          পণ্যের বিবরণ
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="px-6 pb-6">
                      <div className="relative p-6 bg-gradient-to-br from-emerald-50/30 to-amber-50/30 rounded-xl border border-emerald-200/30">
                        <div
                          className="rendered-html prose prose-emerald max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(product.longDesc),
                          }}
                        />
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}

              {/* Size Chart Accordion */}
              {product.sizeChart && (
                <div className="relative bg-white rounded-2xl shadow-lg border-2 border-emerald-100/50 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  </div>

                  <Accordion
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                      width: "100%",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <ExpandMoreIcon className="text-purple-700" />
                        </div>
                      }
                      className="px-6 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                        </div>
                        <Typography
                          component="span"
                          className="font-bold text-emerald-900 text-lg"
                        >
                          সাইজ চার্ট
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="px-6 pb-6">
                      <div className="relative p-6 bg-gradient-to-br from-purple-50/30 to-emerald-50/30 rounded-xl border border-purple-200/30">
                        <div
                          className="rendered-html prose prose-purple max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(product.sizeChart),
                          }}
                        />
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-300/40 rounded-tl"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-300/40 rounded-br"></div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}

              {/* Shipping and Return Accordion */}
              {product.shippingReturn && (
                <div className="relative bg-white rounded-2xl shadow-lg border-2 border-emerald-100/50 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>
                  </div>

                  <Accordion
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                      width: "100%",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <ExpandMoreIcon className="text-amber-700" />
                        </div>
                      }
                      className="px-6 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                          </svg>
                        </div>
                        <Typography
                          component="span"
                          className="font-bold text-emerald-900 text-lg"
                        >
                          ডেলিভারি ও রিটার্ন নীতি
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="px-6 pb-6">
                      <div className="relative p-6 bg-gradient-to-br from-amber-50/30 to-emerald-50/30 rounded-xl border border-amber-200/30">
                        <div
                          className="rendered-html prose prose-amber max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(product.shippingReturn),
                          }}
                        />
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300/40 rounded-tl"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-300/40 rounded-br"></div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </div>

            {/* Related Products Sections */}
            <div className="space-y-8">
              <Suspense fallback={<Skeleton height={200} width={"100%"} />}>
                <RecentlyViewedProducts
                  currentProductId={product._id}
                  products={recentlyViewed}
                />
              </Suspense>
              <Suspense fallback={<Skeleton height={200} width={"100%"} />}>
                <SimilarProducts
                  categoryId={product?.category?._id}
                  productId={product?._id}
                />
              </Suspense>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

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

        /* Custom prose styling for rendered HTML */
        .rendered-html {
          line-height: 1.8;
          color: #374151;
        }

        .rendered-html h1,
        .rendered-html h2,
        .rendered-html h3 {
          color: #065f46;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        .rendered-html p {
          margin-bottom: 1rem;
        }

        .rendered-html ul,
        .rendered-html ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .rendered-html li {
          margin-bottom: 0.5rem;
        }

        .rendered-html strong {
          color: #059669;
          font-weight: 600;
        }

        .rendered-html a {
          color: #d97706;
          text-decoration: underline;
        }

        .rendered-html a:hover {
          color: #b45309;
        }
      `}</style>
    </section>
  );
};

export default ProductDetails;