import React, { useEffect, useRef, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import ImageComponent from "./ImageComponent.jsx";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import GeneralInfoStore from "../../store/GeneralInfoStore.js";
import useCartStore from "../../store/useCartStore.js";
import useAuthUserStore from "../../store/AuthUserStore.js";
import { MdClose } from "react-icons/md";
import Cart from "./Cart.jsx";

const CartLogin = () => {
  const navigate = useNavigate();
  const { GeneralInfoList, GeneralInfoListLoading, GeneralInfoListError } =
    GeneralInfoStore();
  const { cart } = useCartStore();
  const { user, logout } = useAuthUserStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);
  const headerMainRef = useRef(null);

  const prevCartCount = useRef(
    cart.reduce((total, item) => total + item.quantity, 0),
  );

  const avatarClass = `
  w-10 h-10 md:w-14 md:h-14
  rounded-full object-cover border-white border-4
  flex items-center justify-center
  primaryBgColor accentTextColor
  transition-all duration-300 ease-in-out
`;

  useEffect(() => {
    const handleScroll = () => {
      if (headerMainRef.current) {
        const headerMainTop = headerMainRef.current.offsetTop;
        setIsSticky(window.scrollY > headerMainTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      // Close cart menu
      if (
        cartMenuRef.current &&
        !cartMenuRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsCartMenuOpen(false);
      }

      // Close user dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isMenuOpen || isCartMenuOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isCartMenuOpen, isDropdownOpen]);

  useEffect(() => {
    const currentCartCount = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    if (currentCartCount > prevCartCount.current) {
      setIsCartMenuOpen(true);
    }
    prevCartCount.current = currentCartCount;
  }, [cart]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <div className="flex items-center justify-center gap-2 relative">
        {/* Cart */}
        <div
          ref={cartButtonRef}
          onClick={() => setIsCartMenuOpen(!isCartMenuOpen)}
          className="relative  "
        >
          <div className={"flex flex-col justify-center items-center"}>
            {/* Shopping Cart Icon */}
            <CiShoppingCart className="w-7 h-7 cursor-pointer" />

            {/* Text for My Cart */}
            <span className="text-sm hidden lg:block pt-1">My Cart</span>
          </div>

          {/* Cart Quantity Badge */}
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 -mt-2 -mr-2 md:mr-0 primaryBgColor rounded-full h-6 w-6 flex items-center justify-center text-xs accentTextColor">
              {totalQuantity}
            </span>
          )}
        </div>

        {/* User / Dropdown */}
        {user ? (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {user?.userImage &&
              typeof user.userImage === "string" &&
              user.userImage.trim() !== "" ? (
                <ImageComponent
                  imageName={user.userImage}
                  className={avatarClass}
                />
              ) : (
                <span className={avatarClass}>
                  {(user?.fullName &&
                    user.fullName.trim().charAt(0).toUpperCase()) ||
                    "U"}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 top-full right-0 mt-5 bg-white shadow-lg rounded-md p-2"
              >
                <div className="flex flex-col items-center gap-2 p-3">
                  <button className="primaryBgColor px-2 py-2 rounded w-42 accentTextColor cursor-pointer">
                    <Link
                      to="/user/home"
                      className={"flex items-center gap-2 "}
                    >
                      <IoPersonOutline className="w-6 h-6" />
                      <span className="text-sm ">My Account</span>
                    </Link>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 w-42 text-white px-2 py-2 cursor-pointer rounded flex items-center gap-2"
                  >
                    <IoIosLogOut className="text-2xl" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div className="flex items-center gap-2 flex-col">
              <IoPersonOutline className="w-6 h-6" />
              <span className="text-sm hidden lg:block">Login / Register</span>
            </div>
          </Link>
        )}
      </div>
      {/* Slide-In Cart from Right */}
      <div
        ref={cartMenuRef}
        className="fixed z-100 top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform duration-300 ease-in-out"
        style={{
          transform: isCartMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between text-lg mb-4">
            <h1>Your Cart</h1>
            <h1>
              {totalQuantity} {totalQuantity <= 1 ? "item" : "items"}
            </h1>
            <button
              onClick={() => setIsCartMenuOpen(false)}
              className={"cursor-pointer"}
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* Cart Items Scrollable Section */}
          <div className="flex-1 overflow-y-auto space-y-2">
            <Cart onCloseCartMenu={() => setIsCartMenuOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLogin;
