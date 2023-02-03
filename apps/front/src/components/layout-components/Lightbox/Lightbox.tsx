import { Box, Modal, Fade } from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import "./Lightbox.scss";

type LightboxTypes = {
  isLightboxOpen: boolean;
  setLightboxOpen: (isOpen: boolean) => void;
  figureImage: string;
  figureName?: string;
};

export default function Lightbox({ isLightboxOpen, setLightboxOpen, figureImage, figureName }: LightboxTypes) {
  const handleClose = () => {
    setLightboxOpen(!isLightboxOpen);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isLightboxOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={isLightboxOpen}>
          <Box className="lightBox">
            <img src={figureImage} alt="Figure image" className="imageLightbox" />
            <div className="figureName">
              <Subtitle variant="subtitle1" content={`${figureName}`} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
