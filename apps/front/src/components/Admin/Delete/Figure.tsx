import { Box, Modal, Fade, Button } from "@mui/material";
import figureService from "@services/FigureService";
import Head from "@components/layout-components/Typography/Head";
import Subtitle from "@components/layout-components/Typography/Subtitle";
import { globalStateProxy } from "../../../App";
import { IFigure } from "@saigyou-ayakash/types";
import "./../Admin.scss";

type DeleteFigureTypes = {
  isDeleteFigureOpen: boolean;
  setDeleteFigureOpen: (isOpen: boolean) => void;
  deleteFigureId: IFigure["uuid"];
};

export default function DeleteFigure({ isDeleteFigureOpen, setDeleteFigureOpen, deleteFigureId }: DeleteFigureTypes) {
  const handleDeleteFigureClose = () => {
    setDeleteFigureOpen(!isDeleteFigureOpen);
  };

  const handleDelete = (uuid: IFigure["uuid"]) => {
    figureService.deleteFigure(uuid).then(() => {
      globalStateProxy.refetchFigures();
      globalStateProxy.refetchStats();
      handleDeleteFigureClose();
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDeleteFigureOpen}
        onClose={handleDeleteFigureClose}
        closeAfterTransition
      >
        <Fade in={isDeleteFigureOpen}>
          <Box className="adminBox">
            <div className="delete-title">
              <Head variant="h6" content="Confirmation de la suppression" />
            </div>
            <div className="delete-subtitle">
              <Subtitle variant="subtitle1" content="Êtes-vous sûr de vouloir supprimer cette figurine ?" />
            </div>
            <div className="delete-buttons">
              <Button onClick={() => handleDelete(deleteFigureId)} color="primary">
                Supprimer
              </Button>
              <Button color="error" onClick={() => handleDeleteFigureClose()}>
                Annuler
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
