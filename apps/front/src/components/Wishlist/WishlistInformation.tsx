import { Alert, AlertTitle } from "@mui/material";
import "./WishlistInformation.scss";

export default function WishlistInformation() {
  return (
    <>
      <div className="wishlist-info">
        <div className="wishlist-info-body">
          <Alert severity="info">
            <AlertTitle>À quoi sert la Wishlist ?</AlertTitle>
            Une <strong>wishlist</strong> (liste de souhaits) est une liste créée par son utilisateur pour donner des informations sur la nature des
            objets qu'il souhaite recevoir lors d'évènements spécifiques ou autres.
          </Alert>
        </div>
      </div>
    </>
  );
}
