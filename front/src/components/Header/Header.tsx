import { FC } from "react";
import css from "./Header.module.scss";
import cn from "classnames";

interface Props {
  className?: string;
}

const Header: FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, css.header)}>
      <div className={css.logo}>Accrehelp</div>
      <div className={css.profile}>profile</div>
    </div>
  );
};

export default Header;
