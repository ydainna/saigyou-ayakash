import { useEffect, useState } from "react";
import { Box, Modal, Fade, Input, Button, InputLabel } from "@mui/material";
import figureService from "@services/FigureService";
import { getLogger } from "@utils/getLogger";
import { notify } from "@components/layout-components/Notification/Notification";
import { globalStateProxy } from "../../../App";
import "./../Admin.scss";
import "@assets/styles/Mui/Input.scss";

type ModifyFigureDataTypes = {
  uuid: string;
  name: string;
  origin: string;
  maker: string;
  version: string;
  price: number;
};

type ModifyFigureTypes = {
  isModifyFigureOpen: boolean;
  setModifyFigureOpen: (isOpen: boolean) => void;
  modifyFigureData: ModifyFigureDataTypes;
};

export default function ModifyFigure({ isModifyFigureOpen, setModifyFigureOpen, modifyFigureData }: ModifyFigureTypes) {
  const [changeFigure, setChangeFigure] = useState({
    name: modifyFigureData.name,
    origin: modifyFigureData.origin,
    maker: modifyFigureData.maker,
    version: modifyFigureData.version,
    price: modifyFigureData.price,
  });

  useEffect(() => {
    setChangeFigure({
      name: modifyFigureData.name,
      origin: modifyFigureData.origin,
      maker: modifyFigureData.maker,
      version: modifyFigureData.version,
      price: modifyFigureData.price,
    });
  }, [modifyFigureData]);

  const handleChageFigure = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChangeFigure({ ...changeFigure, [name]: value });
  };

  const handleModifyFigureClose = () => {
    setModifyFigureOpen(!isModifyFigureOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    figureService
      .updateFigure(modifyFigureData.uuid, formData)
      .then(() => {
        handleModifyFigureClose();
        globalStateProxy.refetchFigures();
        globalStateProxy.refetchStats();
        notify.success("La figurine a bien été modifiée");
      })
      .catch(() => {
        notify.error("Erreur lors de la modification de la figurine");
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModifyFigureOpen}
        onClose={handleModifyFigureClose}
        closeAfterTransition
      >
        <Fade in={isModifyFigureOpen}>
          <Box className="adminBox" component={"form"} name="FigureForm" onSubmit={handleSubmit}>
            <InputLabel htmlFor="figure-name">Nom</InputLabel>
            <Input id="figure-name" className="adminInput" onChange={handleChageFigure} value={changeFigure.name} name="name" />
            <InputLabel htmlFor="figure-origin">Origine</InputLabel>
            <Input id="figure-origin" className="adminInput" onChange={handleChageFigure} value={changeFigure.origin} name="origin" />
            <InputLabel htmlFor="figure-maker">Fabricant</InputLabel>
            <Input id="figure-maker" className="adminInput" onChange={handleChageFigure} value={changeFigure.maker} name="maker" />
            <InputLabel htmlFor="figure-version">Version</InputLabel>
            <Input id="figure-version" className="adminInput" onChange={handleChageFigure} value={changeFigure.version} name="version" />
            <InputLabel htmlFor="figure-price">Prix</InputLabel>
            <Input
              inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
              id="figure-price"
              className="adminInput"
              onChange={handleChageFigure}
              value={`${changeFigure.price}`}
              name="price"
            />
            <Button variant="text" type="submit">
              Modifier
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
