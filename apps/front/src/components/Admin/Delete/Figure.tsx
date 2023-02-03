import { Box, Modal, Fade, Button } from "@mui/material";
import "./../Admin.scss";
import figureService from "@services/FigureService";
import { notify } from "@components/layout-components/Notification/Notification";
import Head from "@components/layout-components/Typography/Head";
import Subtitle from "@components/layout-components/Typography/Subtitle";
import { globalStateProxy } from "../../../App";

type DeleteFigureTypes = {
  isDeleteFigureOpen: boolean;
  setDeleteFigureOpen: (isOpen: boolean) => void;
  deleteFigureId: string;
};

export default function DeleteFigure({ isDeleteFigureOpen, setDeleteFigureOpen, deleteFigureId }: DeleteFigureTypes) {
  const handleDeleteFigureClose = () => {
    setDeleteFigureOpen(!isDeleteFigureOpen);
  };

  const handleDelete = (uuid: string) => {
    figureService
      .deleteFigure(uuid)
      .then(() => {
        notify.success("La figurine a bien été supprimée");
        globalStateProxy.refetchFigures();
        globalStateProxy.refetchStats();
        handleDeleteFigureClose();
      })
      .catch((error: any) => {
        console.log(error);
        notify.error("Erreur lors de la suppression de la figurine");
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
