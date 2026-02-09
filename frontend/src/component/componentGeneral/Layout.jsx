import Footer from "./Footer.jsx";
import MarqueeModern from "./MarqueeModern.jsx";
import TopHeader from "./TopHeader.jsx";
import Header from "./Header.jsx";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MarqueeModern/>
      {/* Header Section */}
      <TopHeader/>
      <Header />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Layout;
