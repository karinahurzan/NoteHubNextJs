import { BarLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.overlay}>
      <BarLoader />
    </div>
  );
};

export default Loader;
