import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPalette,
  FaLink,
  FaSearch,
  FaCog,
  FaThLarge,
  FaBoxes,
  FaList,
  FaTags,
  FaCreditCard,
  FaUsers,
  FaEnvelope,
  FaUserFriends,
  FaSlidersH,
  FaFileAlt,
  FaQuestionCircle,
  FaUserShield,
  FaSignOutAlt,
  FaShoppingBag,
  FaInfo,
  FaClipboardList,
  FaBlog,
} from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { LuGalleryThumbnails } from "react-icons/lu";

import useAuthAdminStore from "../../store/AuthAdminStore.js";
import useProductStore from "../../store/useProductStore.js";
import useOrderStore from "../../store/useOrderStore.js";
import RequirePermission from "./RequirePermission.jsx";
import AccordionMenuItem from "./AccordionMenuItem.jsx"; // Import the new component

export default function SidebarMenu() {
  const { totalProductsAdmin } = useProductStore();
  const { logout } = useAuthAdminStore();
  const { totalByStatus, fetchAllStatusCounts } = useOrderStore();
  const { loading } = useAuthAdminStore();

  useEffect(() => {
    fetchAllStatusCounts();
  }, [fetchAllStatusCounts]);

  const pendingCount = totalByStatus.pending;
  const approvedCount = totalByStatus.approved;
  const intransitCount = totalByStatus.intransit;
  const deliveredCount = totalByStatus.delivered;
  const returnedCount = totalByStatus.returned;
  const cancelledCount = totalByStatus.cancelled;
  const totalOrders = Object.values(totalByStatus).reduce(
    (acc, count) => acc + count,
    0,
  );

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuConfig = [
    {
      type: "link",
      label: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
      permission: "dashboard",
    },
    {
      type: "group", // Grouping for visual separation, not a real HTML section
      title: "Website Config",
      items: [
        {
          type: "link",
          label: "General Info",
          icon: <FaThLarge />,
          path: "/admin/general-info",
          permission: "website_theme_color",
        },
        // {
        //   type: "link",
        //   label: "Website Theme Color",
        //   icon: <FaPalette />,
        //   path: "/admin/color-updater/",
        //   permission: "general_info",
        // },
        {
          type: "link",
          label: "Social Media Links",
          icon: <FaLink />,
          path: "/admin/social-link-updater",
          permission: "website_theme_color",
        },
        {
          type: "link",
          label: "Home Page SEO",
          icon: <FaSearch />,
          path: "/admin/homepage-seo",
          permission: "home_page_seo",
        },
        {
          type: "link",
          label: "Gallery",
          icon: <LuGalleryThumbnails />,
          path: "/admin/image-gallery",
          permission: "image_gallery",
        },
      ],
    },
    {
      type: "accordion",
      title: "Config",
      icon: <FaCog />,
      permission: [
        "setup_config",
        "product_size",
        "product_flag",
        "scroll_text",
        "delivery_charges",
        "manage_coupons",
      ],
      match: "any",
      subItems: [
        {
          type: "link",
          label: "Setup Your Config",
          path: "/admin/configsetup",
          permission: "setup_config",
        },
        {
          type: "link",
          label: "Add New Product Size",
          path: "/admin/add-product-size",
          permission: "product_size",
        },
        {
          type: "link",
          label: "View All Product Size",
          path: "/admin/product-sizes",
          permission: "product_size",
        },
        {
          type: "link",
          label: "Product Flags",
          path: "/admin/product-flags",
          permission: "product_flag",
        },
        {
          type: "link",
          label: "Scroll Text",
          path: "/admin/scroll-text",
          permission: "scroll_text",
        },
        {
          type: "link",
          label: "Delivery Charges",
          path: "/admin/deliverycharge",
          permission: "delivery_charges",
        },
        {
          type: "link",
          label: "Coupon",
          path: "/admin/coupon",
          permission: "manage_coupons",
        },
      ],
    },
    {
      type: "accordion",
      title: "Category",
      icon: <FaThLarge />,
      permission: "category",
      subItems: [
        {
          type: "link",
          label: "Add New Category",
          path: "/admin/addnewcategory",
        },
        {
          type: "link",
          label: "View All Categories",
          path: "/admin/categorylist",
        },
      ],
    },
    {
      type: "accordion",
      title: "Subcategory",
      icon: <FaBoxes />,
      permission: "sub_category",
      subItems: [
        {
          type: "link",
          label: "Add New Sub Category",
          path: "/admin/addnewsubcategory",
        },
        {
          type: "link",
          label: "View All SubCategories",
          path: "/admin/subcategorylist",
        },
      ],
    },
    {
      type: "accordion",
      title: "Child Category",
      icon: <FaList />,
      permission: "child_category",
      subItems: [
        {
          type: "link",
          label: "Add New Child Category",
          path: "/admin/addnewchildcategory",
        },
        {
          type: "link",
          label: "View All Child Categories",
          path: "/admin/childcategorylist",
        },
      ],
    },
    {
      type: "accordion",
      title: "Manage Products",
      icon: <FaTags />,
      permission: [
        "add_products",
        "delete_products",
        "view_products",
        "edit_products",
      ],
      match: "any",
      subItems: [
        {
          type: "link",
          label: "Add New Product",
          path: "/admin/addnewproduct",
          permission: "add_products",
        },
        {
          type: "link",
          label: `View All Products(${totalProductsAdmin})`,
          path: "/admin/viewallproducts",
          permission: "view_products",
        },
      ],
    },
    {
      type: "accordion",
      title: "Manage Orders",
      icon: <FaShoppingBag />,
      permission: "view_orders",
      subItems: [
        {
          type: "link",
          label: `All Orders (${totalOrders})`,
          path: "/admin/allorders",
        },
        {
          type: "link",
          label: `Pending Orders (${pendingCount})`,
          path: "/admin/pendingorders",
        },
        {
          type: "link",
          label: `Approved Orders (${approvedCount})`,
          path: "/admin/approvedorders",
        },
        {
          type: "link",
          label: `In Transit Orders (${intransitCount})`,
          path: "/admin/intransitorders",
        },
        {
          type: "link",
          label: `Delivered Orders (${deliveredCount})`,
          path: "/admin/deliveredorders",
        },
        {
          type: "link",
          label: `Returned Orders (${returnedCount})`,
          path: "/admin/returnedorders",
        },
        {
          type: "link",
          label: `Cancelled Orders (${cancelledCount})`,
          path: "/admin/cancelledorders",
        },
      ],
    },
    {
      type: "link",
      label: "Incomplete Order",
      icon: <FaClipboardList />,
      path: "/admin/incomplete-order",
      permission: "incomplete_orders",
    },
    {
      type: "accordion",
      title: "Gateway & API",
      icon: <FaCreditCard />,
      permission: ["bkash_api", "steadfast_api", "pathao_api"],
      match: "any",
      subItems: [
        {
          type: "link",
          label: "bKash",
          path: "/admin/bkash-config",
          permission: "bkash_api",
        },
        {
          type: "link",
          label: "Steadfast",
          path: "/admin/steadfast-config",
          permission: "steadfast_api",
        },
        {
          type: "link",
          label: "Pathao",
          path: "/admin/pathao-config",
          permission: "pathao_api",
        },
      ],
    },
    {
      type: "link",
      label: "Customers",
      icon: <FaUsers />,
      path: "/admin/customers",
      permission: "view_customers",
    },
    {
      type: "group",
      title: "Other Sections",
      items: [
        {
          type: "link",
          label: "Contact Request",
          icon: <FaEnvelope />,
          path: "/admin/contact-request",
          permission: "contact_request",
        },
        // {
        //   type: "link",
        //   label: "Subscribed Users",
        //   icon: <FaUserFriends />,
        //   path: "/admin/subscribed-users",
        //   permission: "subscribed_users",
        // },
        // {
        //   type: "link",
        //   label: "Blogs",
        //   icon: <FaBlog />,
        //   path: "/admin/blogs",
        //   permission: "blogs",
        // },
        // {
        //   type: "link",
        //   label: "Sliders & Banners",
        //   icon: <FaSlidersH />,
        //   path: "/admin/sliders-banners",
        //   permission: "sliders-banners",
        // },
        // {
        //   type: "link",
        //   label: "Terms & Policies",
        //   icon: <FaFileAlt />,
        //   path: "/admin/terms-policies",
        //   permission: "about_terms-policies",
        // },
        {
          type: "link",
          label: "FAQs",
          icon: <FaQuestionCircle />,
          path: "/admin/faqs",
          permission: "faqs",
        },
        // {
        //   type: "link",
        //   label: "About Us",
        //   icon: <FaInfo />,
        //   path: "/admin/about-us",
        //   permission: "about_terms-policies",
        // },
      ],
    },
    {
      type: "link",
      label: "System Users",
      icon: <FaUserShield />,
      path: "/admin/adminlist",
      permission: "admin-users",
    },
    {
      type: "logout",
      label: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  if (loading) {
    return (
      <div className="w-64 mt-100 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-fit p-4 h-screen overflow-y-auto ">
      {menuConfig.map((item, index) => {
        if (item.type === "link") {
          return (
            <ul key={index} className="space-y-1">
              <RequirePermission permission={item.permission} fallback={true}>
                <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
                  <Link to={item.path} className={"flex items-center gap-2"}>
                    {item.icon} <span>{item.label}</span>
                  </Link>
                </li>
              </RequirePermission>
            </ul>
          );
        } else if (item.type === "accordion") {
          return (
            <ul key={index} className="space-y-1">
              <AccordionMenuItem
                icon={item.icon}
                title={item.title}
                permission={item.permission}
                match={item.match} // Pass match prop if it exists
              >
                {item.subItems.map((subItem, subIndex) => (
                  <RequirePermission
                    key={subIndex}
                    permission={subItem.permission}
                    fallback={true}
                  >
                    <li>
                      <Link to={subItem.path}>{subItem.label}</Link>
                    </li>
                  </RequirePermission>
                ))}
              </AccordionMenuItem>
            </ul>
          );
        } else if (item.type === "group") {
          return (
            <div key={index}>
              <ul className="space-y-1">
                {item.items.map((groupItem, groupIndex) => (
                  <RequirePermission
                    key={groupIndex}
                    permission={groupItem.permission}
                    fallback={true}
                  >
                    <li className="flex items-center space-x-2 p-2 rounded-md cursor-pointer">
                      <Link
                        to={groupItem.path}
                        className={"flex items-center gap-2"}
                      >
                        {groupItem.icon} <span>{groupItem.label}</span>
                      </Link>
                    </li>
                  </RequirePermission>
                ))}
              </ul>
            </div>
          );
        } else if (item.type === "logout") {
          return (
            <ul key={index}>
              <li className="flex items-center space-x-2 p-2 rounded-md text-red-500 cursor-pointer">
                <button
                  onClick={handleLogout}
                  className={"flex items-center space-x-2 cursor-pointer"}
                >
                  {item.icon} <span>{item.label}</span>
                </button>
              </li>
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}
