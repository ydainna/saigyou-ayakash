import { useEffect, useState } from "react";
import { Box, Modal, Fade, Input, Button, InputLabel } from "@mui/material";
import figureService from "@services/FigureService";
import { globalStateProxy } from "../../../App";
import "./../Admin.scss";
import { IFigure } from "@saigyou-ayakash/types";

type ModifyFigureTypes = {
  isModifyFigureOpen: boolean;
  setModifyFigureOpen: (isOpen: boolean) => void;
  modifyFigureData: IFigure;
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
    figureService.updateFigure(modifyFigureData.uuid, formData).then(() => {
      handleModifyFigureClose();
      globalStateProxy.refetchFigures();
      globalStateProxy.refetchStats();
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
            <InputLabel htmlFor="name">Nom</InputLabel>
            <Input id="name" className="adminInput" onChange={handleChageFigure} value={changeFigure.name} name="name" />
            <InputLabel htmlFor="origin">Origine</InputLabel>
            <Input id="origin" className="adminInput" onChange={handleChageFigure} value={changeFigure.origin} name="origin" />
            <InputLabel htmlFor="maker">Fabricant</InputLabel>
            <Input id="maker" className="adminInput" onChange={handleChageFigure} value={changeFigure.maker} name="maker" />
            <InputLabel htmlFor="version">Version</InputLabel>
            <Input id="version" className="adminInput" onChange={handleChageFigure} value={changeFigure.version} name="version" />
            <InputLabel htmlFor="price">Prix</InputLabel>
            <Input
              inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
              id="price"
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
