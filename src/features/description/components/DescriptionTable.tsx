import { Description } from "@/features/description/types/description";
import clsx from "clsx";
import { FC } from "react";

interface DescriptionTableProps {
  dataArr: Description[] | [];
}

export const DescriptionTable: FC<DescriptionTableProps> = ({ dataArr }) => {
  console.log(dataArr);

  return (
    <>
      {dataArr.map((item) => (
        <div key={item?.id ?? 0} className={clsx("flex gap-4 justify-between")}>
          <p>{item?.id}</p>
          <p>{item?.name}</p>
          <p>{item?.type}</p>
          <p>{item?.displayData}</p>
          <p>{item?.displayEvent}</p>
          <p>{item?.note}</p>
        </div>
      ))}
    </>
  );
};
