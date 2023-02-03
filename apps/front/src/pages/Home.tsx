import Footer from "@components/layout-components/Footer/Footer";
import HeaderNav from "@components/layout-components/HeaderNav/HeaderNav";
import FigureDataTable from "@components/Tables/FigureDataTable";
import Stats from "@components/Stats/Stats";
import "@assets/styles/Pages/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <HeaderNav />
      <Stats />
      <div className="figure-data-body">
        <FigureDataTable />
      </div>
      <Footer />
    </div>
  );
}
