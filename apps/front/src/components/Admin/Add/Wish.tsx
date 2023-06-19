import { Box, Modal, Fade, Input, Button, InputLabel } from "@mui/material";
import { DateTime } from "luxon";
import wishlistService from "@services/WishlistService";
import { globalStateProxy } from "../../../App";
import "./../Admin.scss";

type AddWishTypes = {
  isAddWishOpen: boolean;
  setAddWishOpen: (isOpen: boolean) => void;
};

export default function AddWish({ isAddWishOpen, setAddWishOpen }: AddWishTypes) {
  const handleAddWishClose = () => {
    setAddWishOpen(!isAddWishOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    wishlistService.add(data).then(() => {
      handleAddWishClose();
      globalStateProxy.refetchWishes();
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
            <Input id="wish-link" className="adminInput" placeholder="amazon.jp, goodmsile.com..." name="link" />
            <InputLabel htmlFor="wish-name">Nom</InputLabel>
            <Input id="wish-name" className="adminInput" placeholder="Rem, Alice, Pikachu..." name="name" />
            <InputLabel htmlFor="wish-origin">Origine</InputLabel>
            <Input id="wish-origin" className="adminInput" placeholder="Re:zero, sword art online..." name="origin" />
            <InputLabel htmlFor="wish-maker">Fabricant</InputLabel>
            <Input id="wish-maker" className="adminInput" placeholder="Banpresot, Bendai, Sega..." name="maker" />
            <InputLabel htmlFor="wish-version">Version</InputLabel>
            <Input id="wish-version" className="adminInput" placeholder="EXQ, PM, ARTX..." name="version" />
            <InputLabel htmlFor="wish-price">Prix</InputLabel>
            <Input
              inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
              id="wish-price"
              className="adminInput"
              placeholder="45.99"
              name="price"
            />
            <InputLabel htmlFor="wish-date">Date</InputLabel>
            <Input disabled defaultValue={DateTime.now().toFormat("yyyy-MM-dd")} id="wish-date" className="adminInput" placeholder="Date" />
            <Button variant="text" type="submit">
              Ajouter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
