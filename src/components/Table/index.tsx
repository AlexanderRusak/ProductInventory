import { useMemo } from "react";
import styles from "./styles.module.scss";

type Action = {
  index: number,
  actionPayloadIndex?: number,
  // eslint-disable-next-line no-unused-vars
  action: (payload: string) => void, // uses 42 ln
}

type TableProps = {
  columns: string[];
  rows: (string | number)[][];
  actions?: Action[];
  isSubmitting?: boolean;
};
export const Table = ({
  columns,
  rows,
  actions,
  isSubmitting = false,
}: TableProps) => {


  const tableHeadElement = useMemo(() => <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column}</th>
      ))}
    </tr>
  </thead>, [columns]);

  const tableBodyElement = useMemo(() => <tbody>
    {rows.map((value, index) => (
      <tr key={value?.[0] ?? index}>
        {value.map((val, index) => {
          const columnAction = actions?.find((action) => action.index === index);
          if (actions && columnAction && columnAction.actionPayloadIndex) {
            const actionPayload = value[columnAction.actionPayloadIndex] ?? "";
            return (
              <td key={index} className={styles.action}>
                <button onClick={() => columnAction.action(actionPayload.toString())} disabled={isSubmitting}>
                  {val}
                </button>
              </td>
            );
          } else {
            return (
              <td key={index}>{val}</td>
            );
          }
        })}
      </tr>
    ))}
  </tbody>, [rows, actions, isSubmitting]); // Todo looks like need simplify or move to separate component


  return (
    <table className={styles.table}>
      {tableHeadElement}
      {tableBodyElement}
    </table>
  );
};