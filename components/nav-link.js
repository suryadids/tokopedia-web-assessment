import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

const NavLink = (props) => {
  return (
    <li className={props.className}>
      <Link href={props.href}>
        <a>{props.name}</a>
      </Link>
    </li>
  );
};

export default NavLink;
