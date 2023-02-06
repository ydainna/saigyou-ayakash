import { useState } from "react";
import { Box, Modal, Fade, Input, Button, InputLabel } from "@mui/material";
import moment from "moment";
import wishlistService from "@services/WishlistService";
import { notify } from "@components/layout-components/Notification/Notification";
import { getLogger } from "@utils/getLogger";
import { globalStateProxy } from "../../../App";
import "./../Admin.scss";
import "@assets/styles/Mui/Input.scss";

type AddWishTypes = {
  isAddWishOpen: boolean;
  setAddWishOpen: (isOpen: boolean) => void;
};

export default function AddWish({ isAddWishOpen, setAddWishOpen }: AddWishTypes) {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleAddWishClose = () => {
    setAddWishOpen(!isAddWishOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const log = getLogger("Addwish");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    wishlistService
      .add(data)
      .then(() => {
        handleAddWishClose();
        globalStateProxy.refetchWishes();
        notify.success("Le souhait a bien été ajouté");
      })
      .catch((error: Error) => {
        log.error(error);
        notify.error("Erreur lors de l'ajout du souhait");
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAddWishOpen}
        onClose={handleAddWishClose}
        closeAfterTransition
      >
        <Fade in={isAddWishOpen}>
          <Box className="adminBox" component={"form"} name="WishForm" onSubmit={handleSubmit}>
            <InputLabel htmlFor="wish-link">Lien</InputLabel>
            <Input id="wish-link" error={error ? true : false} className="adminInput" placeholder="amazon.jp, goodmsile.com..." name="link" />
            <InputLabel htmlFor="wish-name">Nom</InputLabel>
            <Input id="wish-name" error={error ? true : false} className="adminInput" placeholder="Rem, Alice, Pikachu..." name="name" />
            <InputLabel htmlFor="wish-origin">Origine</InputLabel>
            <Input id="wish-origin" error={error ? true : false} className="adminInput" placeholder="Re:zero, sword art online..." name="origin" />
            <InputLabel htmlFor="wish-maker">Fabricant</InputLabel>
            <Input id="wish-maker" error={error ? true : false} className="adminInput" placeholder="Banpresot, Bendai, Sega..." name="maker" />
            <InputLabel htmlFor="wish-version">Version</InputLabel>
            <Input id="wish-version" error={error ? true : false} className="adminInput" placeholder="EXQ, PM, ARTX..." name="version" />
            <InputLabel htmlFor="wish-price">Prix</InputLabel>
            <Input
              inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
              id="wish-price"
              error={error ? true : false}
              className="adminInput"
              placeholder="45.99"
              name="price"
            />
            <InputLabel htmlFor="wish-date">Date</InputLabel>
            <Input
              disabled
              defaultValue={moment().format("YYYY-MM-DD")}
              id="wish-date"
              error={error ? true : false}
              className="adminInput"
              placeholder="Date"
            />
            <Button variant="text" type="submit">
              Ajouter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
