import clsx from "clsx";
import { Handle, Position } from "reactflow";
import { cn } from "~/components/ui/lib/cn";
import EnumContextMenu from "../components/enum-context-menu";
import EnumFieldContextMenu from "../components/enum-field-context-menu";
import { type EnumNodeData } from "../util/types";
import styles from "./styles.module.scss";

const EnumNode = ({ data }: EnumNodeProps) => {
  return (
    <table
      className=" bg-modal border-brand-indigo-2 border-separate overflow-hidden rounded-2xl border-[1px] text-sm text-white shadow-md transition-colors duration-200"
      style={{ minWidth: 200, maxWidth: 500, borderSpacing: 0 }}
      tabIndex={0}
    >
      <Handle
        className={clsx([styles.handle, styles.top])}
        type="source"
        id={data.name + "-handle"}
        position={Position.Top}
        isConnectable={false}
      />
      <thead
        title={data.documentation}
        className="hover:bg-brand-dark transition-color duration-200"
      >
        <tr>
          <EnumContextMenu model={data.name}>
            <th className="border-brand-indigo-2 flex cursor-context-menu items-center justify-between border-b-[1px] p-2 pl-4 text-start font-bold">
              <span>
                <span>{data.name}</span>
                {!!data.dbName && (
                  <span className="font-normal">&nbsp;({data.dbName})</span>
                )}
              </span>
            </th>
          </EnumContextMenu>
        </tr>
      </thead>
      <tbody className="flex min-h-[40px] flex-col overflow-hidden py-2">
        {data.values.map((val) => (
          <tr
            key={val}
            className={cn(
              styles.row,
              "hover:bg-brand-dark transition-color relative duration-200"
            )}
          >
            <EnumFieldContextMenu field={val} model={data.name}>
              <div className="absolute inset-0 cursor-context-menu"></div>
            </EnumFieldContextMenu>
            <td className=" flex px-4 ">{val}</td>
          </tr>
        ))}
      </tbody>
      <Handle
        className={clsx([styles.handle, styles.bottom])}
        type="source"
        id={data.name + "-handle"}
        position={Position.Bottom}
        isConnectable={false}
      />
    </table>
  );
};

export interface EnumNodeProps {
  data: EnumNodeData;
}

export default EnumNode;
