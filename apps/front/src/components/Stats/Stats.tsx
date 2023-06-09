import { useQuery } from "@tanstack/react-query";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Fade, styled } from "@mui/material";
import { DateTime } from "luxon";
import euro from "@assets/img/icons/statistic/euro.svg";
import figure from "@assets/img/icons/statistic/figure.svg";
import calendar from "@assets/img/icons/statistic/calendrier.svg";
import figureService from "@services/FigureService";
import Subtitle from "@components/layout-components/Typography/Subtitle";
import Head from "@components/layout-components/Typography/Head";
import "./Stats.scss";
import { globalStateProxy } from "../../App";
import Loader from "@components/layout-components/Loader/Loader";

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

export default function Stats() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["statsData"],
    queryFn: () =>
      figureService.getStats().then((response: any) => {
        return response;
      }),
  });
  globalStateProxy.refetchStats = refetch;

  return (
    <>
      <div className="statistic">
        <BootstrapTooltip title="Prix totale de la collection" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <div className="statistic-body">
            <div className="statistic-title">
              <Head variant="h6" content="Prix total" />
            </div>
            <div className="statistic-content">
              <span className="statistic-prefix">
                {isLoading ? (
                  <Loader loaderType="loading" className="statistic-loading" />
                ) : error ? (
                  <Loader loaderType="error" className="statistic-error" />
                ) : (
                  <img src={euro} alt="Icon bag money" className="statistic-icon" />
                )}
              </span>
              <span className="statistic-content-value">
                <span className="statistic-content-value-int">
                  {isLoading ? (
                    <Subtitle variant="subtitle1" content="Chargement..." />
                  ) : error ? (
                    <Subtitle variant="subtitle1" content="Erreur lors du chargement des données" />
                  ) : (
                    <Subtitle variant="subtitle1" content={data?.totalPrice.toFixed(2)} />
                  )}
                </span>
              </span>
            </div>
          </div>
        </BootstrapTooltip>
        <BootstrapTooltip title="Nombre de figurine dans la collection" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <div className="statistic-body">
            <div className="statistic-title">
              <Head variant="h6" content="Nombre de figurines" />
            </div>
            <div className="statistic-content">
              <span className="statistic-prefix">
                {isLoading ? (
                  <Loader loaderType="loading" className="statistic-loading" />
                ) : error ? (
                  <Loader loaderType="error" className="statistic-error" />
                ) : (
                  <img src={figure} alt="Icon head monster skeleton" className="statistic-icon" />
                )}
              </span>
              <span className="statistic-content-value">
                <span className="statistic-content-value-int">
                  {isLoading ? (
                    <Subtitle variant="subtitle1" content="Chargement..." />
                  ) : error ? (
                    <Subtitle variant="subtitle1" content="Erreur lors du chargement des données" />
                  ) : (
                    <Subtitle variant="subtitle1" content={data?.totalCount} />
                  )}
                </span>
              </span>
            </div>
          </div>
        </BootstrapTooltip>
        <BootstrapTooltip title="Mise à jour de la liste" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <div className="statistic-body">
            <div className="statistic-title">
              <Head variant="h6" content="Dernière mise à jour" />
            </div>
            <div className="statistic-content">
              <span className="statistic-prefix">
                {isLoading ? (
                  <Loader loaderType="loading" className="statistic-loading" />
                ) : error ? (
                  <Loader loaderType="error" className="statistic-error" />
                ) : (
                  <img src={calendar} alt="Icon calendar" className="statistic-icon" />
                )}
              </span>
              <span className="statistic-content-value">
                <span className="statistic-content-value-int">
                  {isLoading ? (
                    <Subtitle variant="subtitle1" content="Chargement..." />
                  ) : error ? (
                    <Subtitle variant="subtitle1" content="Erreur lors du chargement des données" />
                  ) : (
                    <Subtitle variant="subtitle1" content={DateTime.fromJSDate(new Date(data?.lastDate)).setLocale("fr").toFormat("d MMMM yyyy")} />
                  )}
                </span>
              </span>
            </div>
          </div>
        </BootstrapTooltip>
      </div>
    </>
  );
}
