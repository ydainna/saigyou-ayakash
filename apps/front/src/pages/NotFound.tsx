import { Alert, AlertTitle } from "@mui/material";
import Footer from "@components/layout-components/Footer/Footer";
import HeaderNav from "@components/layout-components/HeaderNav/HeaderNav";
import Head from "@components/layout-components/Typography/Head";
import notfound from "./../assets/img/404.jpg";
import "@assets/styles/Pages/Notfound.scss";

export default function NotFound() {
  return (
    <div className="notfound">
      <HeaderNav />
      <div className="notfound-body">
        <img src={notfound} alt="404" className="notfound-img" />
        <div className="notfound-text">
          <Alert severity="error">
            <AlertTitle>Erreur 404</AlertTitle>
            Mince alors ! il semblerais que la page n'existe pas... <br />
            <strong>Revenez en arrière</strong> ou <strong>retournez à l'accueil</strong>.
          </Alert>
        </div>
      </div>
      <Footer />
      {/*
        __                 
       '. \  🅷🅴🅻🅻🅾, 🅼🆈 🅽🅰🅼🅴 🅸🆂 🅴🅻🅼🅴🆁 ❗
        '- \               
          / /_         .---.
        / | \\,.\/--.//    )
        |  \//        )/  / 
          \  ' ^ ^    /    )____.----..  6
          '.____.    .___/            \._) 
              .\/.                      )
              '\            🌸        /
              _/ \/    ).        )    (
              /#  .!    |        /\    /
              \  C// #  /'-----''/ #  / 
          .   'C/ |    |    |   |    |mrf  ,
          \), .. .'OOO-'. ..'OOO'OOO-'. ..\(,
      */}
    </div>
  );
}
