import { useState } from "react";
import { Box, Modal, Fade, Input, Button, InputLabel } from "@mui/material";
import FileUpload from "react-mui-fileuploader";
import moment from "moment";
import figureService from "@services/FigureService";
import { notify } from "@components/layout-components/Notification/Notification";
import { globalStateProxy } from "../../../App";
import "./../Admin.scss";
import "@assets/styles/Mui/Input.scss";

type AddFigureTypes = {
  isAddFigureOpen: boolean;
  setAddFigureOpen: (isOpen: boolean) => void;
};

export default function AddFigure({ isAddFigureOpen, setAddFigureOpen }: AddFigureTypes) {
  const [filesToUpload, setFilesToUpload] = useState<any>([]);

  const handleFilesChange = (file: any) => {
    setFilesToUpload(file);
  };

  const handleAddFigureClose = () => {
    setAddFigureOpen(!isAddFigureOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("img", filesToUpload[0]);
    figureService.add(formData).then(() => {
      handleAddFigureClose();
      globalStateProxy.refetchFigures();
      globalStateProxy.refetchStats();
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAddFigureOpen}
        onClose={handleAddFigureClose}
        closeAfterTransition
      >
        <Fade in={isAddFigureOpen}>
          <Box className="adminBox" component={"form"} name="FigureForm" onSubmit={handleSubmit}>
            <FileUpload
              multiFile={false}
              showPlaceholderImage={false}
              title="Image de la figurine"
              leftLabel="ou"
              rightLabel="pour ajouter une image"
              buttonLabel="Choisir un fichier"
              buttonRemoveLabel="Supprimer le fichier"
              maxFileSize={10}
              maxUploadFiles={1}
              maxFilesContainerHeight={357}
              acceptedType={"image/*"}
              errorSizeMessage={"Le fichier est trop volumineux"}
              allowedExtensions={["jpg", "jpeg"]}
              onFilesChange={handleFilesChange}
              BannerProps={{
                elevation: 1,
                variant: "elevation",
                sx: {
                  p: 1,
                  backgroundColor: "#283243",
                },
              }}
              ContainerProps={{
                elevation: 1,
                variant: "elevation",
                sx: { p: 1, backgroundColor: "#1b2531" },
              }}
            />
            <hr />
            <InputLabel htmlFor="figure-name">Nom</InputLabel>
            <Input id="figure-name" className="adminInput" placeholder="Rem, Alice, Pikachu..." name="name" />
            <InputLabel htmlFor="figure-origin">Origine</InputLabel>
            <Input id="figure-origin" className="adminInput" placeholder="Re:zero, sword art online..." name="origin" />
            <InputLabel htmlFor="figure-maker">Fabricant</InputLabel>
            <Input id="figure-maker" className="adminInput" placeholder="Banpresto, bendai, Sega..." name="maker" />
            <InputLabel htmlFor="figure-version">Version</InputLabel>
            <Input id="figure-version" className="adminInput" placeholder="EXQ, PM, ARTX..." name="version" />
            <InputLabel htmlFor="figure-price">Prix</InputLabel>
            <Input
              inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
              id="figure-price"
              className="adminInput"
              placeholder="45.99"
              name="price"
            />
            <InputLabel htmlFor="figure-date">Date</InputLabel>
            <Input id="figure-date" defaultValue={moment().format("YYYY-MM-DD")} disabled className="adminInput" />
            <Button variant="text" type="submit">
              Ajouter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
