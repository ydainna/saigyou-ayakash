import Footer from "@components/layout-components/Footer/Footer";
import HeaderNav from "@components/layout-components/HeaderNav/HeaderNav";
import { Player } from "@lottiefiles/react-lottie-player";
import Head from "@components/layout-components/Typography/Head";
import notfound from "./../assets/lottie/notFound.json";
import "@assets/styles/Pages/Notfound.scss";

export default function NotFound() {
  return (
    <div className="notfound">
      <HeaderNav />
      <div className="notfound-body">
        <Player autoplay loop src={notfound} style={{ height: "350px", width: "350px" }} />
        <div className="notfound-text">
          <Head variant="h1" content="404" />
        </div>
      </div>
      <Footer />
      {/*
        __                 
        '. \  π·π΄π»π»πΎ, πΌπ π½π°πΌπ΄ πΈπ π΄π»πΌπ΄π β
        '- \               
          / /_         .---.
        / | \\,.\/--.//    )
        |  \//        )/  / 
          \  ' ^ ^    /    )____.----..  6
          '.____.    .___/            \._) 
              .\/.                      )
              '\                       /
              _/ \/    ).        )    (
              /#  .!    |        /\    /
              \  C// #  /'-----''/ #  / 
          .   'C/ |    |    |   |    |mrf  ,
          \), .. .'OOO-'. ..'OOO'OOO-'. ..\(,
      */}
    </div>
  );
}
