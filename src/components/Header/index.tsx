import { NavLink } from "react-router-dom";

import { ROUTES } from "@constants/routes";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="navigation">
        <ul>
          <li>
            <NavLink
              to={ROUTES.INVENTORY_LIST}
              aria-label="inventory list"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
                            Inventory
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.CREATE_PRODUCT}
              aria-label="create new product"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
                            Create Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};