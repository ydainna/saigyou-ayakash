import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "./../../../assets/lottie/error.json";
import loading from "./../../../assets/lottie/loading.json";
import "./Loader.scss";

type LoaderTypes = {
  className: string;
  loaderType: "error" | "loading";
};

export default function Loader({ className, loaderType }: LoaderTypes) {
  return (
    <>
      <Player autoplay loop src={loaderType === "error" ? errorAnimation : loading} className={className} />
    </>
  );
}
