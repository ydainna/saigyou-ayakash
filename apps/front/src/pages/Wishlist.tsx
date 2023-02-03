import Footer from "@components/layout-components/Footer/Footer";
import HeaderNav from "@components/layout-components/HeaderNav/HeaderNav";
import WishlistDataTable from "@components/Tables/WishlistDataTable";
import WishlistInformation from "@components/Wishlist/WishlistInformation";
import "@assets/styles/Pages/Wishlist.scss";

export default function Wishlist() {
  return (
    <div className="wishlist">
      <HeaderNav />
      <WishlistInformation />
      <div className="wishlist-data-body">
        <WishlistDataTable />
      </div>
      <Footer />
    </div>
  );
}
