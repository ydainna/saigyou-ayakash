import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from "@mui/material";
import { FcLink, FcFullTrash, FcPlus } from "react-icons/fc";
import { DateTime } from "luxon";
import AddWish from "./../Admin/Add/Wish";
import wishlistService from "@services/WishlistService";
import { notify } from "@components/layout-components/Notification/Notification";
import { AuthContext } from "./../../auth/AuthContext";
import "@assets/styles/Mui/Datatable.scss";
import { globalStateProxy } from "../../App";
import Loader from "@components/layout-components/Loader/Loader";
import Subtitle from "@components/layout-components/Typography/Subtitle";
import { IWish } from "@saigyou-ayakash/types";

export default function WishlistDataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddWishOpen, setAddWishOpen] = useState<boolean>(false);

  const { isLogin } = useContext(AuthContext);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["wishData"],
    queryFn: () =>
      wishlistService.getAll().then((response: any) => {
        return response;
      }),
  });
  globalStateProxy.refetchWishes = refetch;

  const handleDelete = (uuid: string) => {
    wishlistService
      .delete(uuid)
      .then(() => {
        notify.success("Le souhait a bien été supprimé");
        refetch();
      })
      .catch((error: any) => {
        console.log(error);
        notify.error("Erreur lors de la suppression du souhait");
      });
  };

  const handleAddWishOpen = () => {
    setAddWishOpen(true);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      {isLogin && (
        <Button color="primary" startIcon={<FcPlus />} onClick={handleAddWishOpen} className="buttonAdd">
          Ajouter
        </Button>
      )}
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lien</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Origine</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Fabricant</TableCell>
                  <TableCell>Date d'ajout</TableCell>
                  <TableCell>Prix</TableCell>
                  {isLogin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IWish) => {
                  const createdAt = DateTime.fromJSDate(new Date(row.date)).setLocale("fr").toFormat("d MMMM yyyy");

                  return (
                    <TableRow hover key={row.uuid}>
                      <TableCell>
                        <Button startIcon={<FcLink />} onClick={() => window.open(`${row.link}`, "_blank")}>
                          Lien
                        </Button>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.origin}</TableCell>
                      <TableCell>{row.version}</TableCell>
                      <TableCell>{row.maker}</TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>{row.price} €</TableCell>
                      {isLogin && (
                        <TableCell>
                          <Button color="error" onClick={() => handleDelete(row.uuid)} startIcon={<FcFullTrash />}>
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <AddWish isAddWishOpen={isAddWishOpen} setAddWishOpen={setAddWishOpen} />
    </>
  );
}
