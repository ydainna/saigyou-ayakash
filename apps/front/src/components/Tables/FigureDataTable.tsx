import { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Input,
  InputAdornment,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
} from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { FcSearch, FcPlus, FcFullTrash, FcEditImage } from "react-icons/fc";
import moment from "moment";
import Lightbox from "@components/layout-components/Lightbox/Lightbox";
import figureService from "@services/FigureService";
import AddFigure from "./../Admin/Add/Figure";
import ModifyFigure from "./../Admin/Modify/Figure";
import { constants } from "@utils/constants";
import { AuthContext } from "./../../auth/AuthContext";
import "@assets/styles/Mui/Datatable.scss";
import "@assets/styles/Mui/Input.scss";
import { globalStateProxy } from "../../App";
import Subtitle from "@components/layout-components/Typography/Subtitle";
import Loader from "@components/layout-components/Loader/Loader";
import DeleteFigure from "@components/Admin/Delete/Figure";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} arrow classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: 14,
    },
  })
);

type DataTypes = {
  uuid: string;
  img: string;
  name: string;
  origin: string;
  version: string;
  maker: string;
  date: string;
  price: number;
};

export default function FigureDataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [figureImage, setFigureImage] = useState("");
  const [modifyFigureData, setModifyFigureData] = useState<DataTypes>({} as DataTypes);
  const [figureName, setFigureName] = useState("");
  const [figureId, setFigureId] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isAddFigureOpen, setAddFigureOpen] = useState<boolean>(false);
  const [isModifyFigureOpen, setModifyFigureOpen] = useState<boolean>(false);
  const [isDeleteFigureOpen, setDeleteFigureOpen] = useState<boolean>(false);

  const { isLogin } = useContext(AuthContext);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["figureData"],
    queryFn: () =>
      figureService.getAll().then((response: any) => {
        return response;
      }),
  });
  globalStateProxy.refetchFigures = refetch;

  const handleAddFigureOpen = () => {
    setAddFigureOpen(true);
  };

  const handleModifyFigureOpen = (row: any) => {
    setModifyFigureOpen(true);
    setModifyFigureData(row);
  };

  const handleDeleteFigureOpen = (figureUuid: string) => {
    setFigureId(figureUuid);
    setDeleteFigureOpen(true);
  };

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((item: DataTypes) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.origin.toLowerCase().includes(search.toLowerCase()) ||
            item.version.toLowerCase().includes(search.toLowerCase()) ||
            item.maker.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  }, [search, data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLightboxOpen = (image: string, name: string) => {
    setFigureImage(constants.API_URL + "/img/" + image);
    setFigureName(name);
    setLightboxOpen(true);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Loader loaderType="loading" className="figure-loading" />
          <div className="loading-text">
            <Subtitle variant="subtitle1" content="Chargement des données..." />
          </div>
        </div>
      ) : error ? (
        <div className="loading">
          <Loader loaderType="error" className="figure-error" />
          <div className="loading-text">
            <Subtitle variant="subtitle1" content="Erreur lors du chargement des données" />
          </div>
        </div>
      ) : (
        <>
          <div className="utils">
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <FcSearch />
                </InputAdornment>
              }
            />
            {isLogin && (
              <Button color="primary" startIcon={<FcPlus />} onClick={handleAddFigureOpen} className="buttonAdd">
                Ajouter
              </Button>
            )}
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Origine</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Fabricant</TableCell>
                  <TableCell>Date d'ajout</TableCell>
                  <TableCell>Prix</TableCell>
                  {isLogin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData).map((row: DataTypes) => {
                  return (
                    <TableRow hover key={row.uuid}>
                      <TableCell>
                        <BootstrapTooltip title="Cliquez sur l'image pour l'agrandir" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                          <Avatar
                            src={`${constants.API_URL}/img/${row.img}`}
                            variant="rounded"
                            sx={{ width: 60, height: 60, cursor: "pointer" }}
                            onClick={() => handleLightboxOpen(row.img, row.name)}
                            alt={row.name}
                          />
                        </BootstrapTooltip>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.origin}</TableCell>
                      <TableCell>{row.version}</TableCell>
                      <TableCell>{row.maker}</TableCell>
                      <TableCell>{moment(new Date(row.date)).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{row.price} €</TableCell>
                      {isLogin && (
                        <TableCell>
                          <Button onClick={() => handleModifyFigureOpen(row)} color="primary" startIcon={<FcEditImage />}>
                            Modifier
                          </Button>
                          <Button onClick={() => handleDeleteFigureOpen(row.uuid)} color="error" startIcon={<FcFullTrash />}>
                            Supprimer
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 15, 35]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <Lightbox isLightboxOpen={isLightboxOpen} setLightboxOpen={setLightboxOpen} figureImage={figureImage} figureName={figureName} />
      <AddFigure isAddFigureOpen={isAddFigureOpen} setAddFigureOpen={setAddFigureOpen} />
      <ModifyFigure isModifyFigureOpen={isModifyFigureOpen} setModifyFigureOpen={setModifyFigureOpen} modifyFigureData={modifyFigureData} />
      <DeleteFigure isDeleteFigureOpen={isDeleteFigureOpen} setDeleteFigureOpen={setDeleteFigureOpen} deleteFigureId={figureId} />
    </>
  );
}
