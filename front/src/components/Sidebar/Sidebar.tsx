import css from "./Sidebar.module.scss";
import cn from "classnames";
import { FC } from "react";
import ProductCard from "components/ProductCard/ProductCard";

interface Props {
  className?: string;
}

const Sidebar: FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, css.sidebar)}>
      <ProductCard />
    </div>
  );
};

export default Sidebar;
