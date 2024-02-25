import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

function Layout({ children }) {
  return (
    <>
      <PageNav />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
