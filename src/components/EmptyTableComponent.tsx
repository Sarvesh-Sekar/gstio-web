import { BadgePlus, Loader } from "lucide-react";

type EmptyTableComponentProps = {
  title: string;
  subtitle: string;
  emptyStateDescription: string;
  onClick?: () => void;
  loading: boolean;
};
export default function EmptyStateTableComponent({
  title,
  subtitle,
  loading,
  emptyStateDescription,
  onClick,
}: EmptyTableComponentProps) {
  return (
    <div className="w-full h-[60%] border-2 rounded-[20px] flex flex-col gap-y-4 m-2 p-4">
      <div className="w-full h-[20%] flex flex-col gap-y-2">
        <div className="text-xl"> {title}</div>
        <div className="text-lg/2 text-muted">{subtitle}</div>
      </div>
      <div className="flex flex-col items-center justify-center border-2 rounded-[20px] w-full h-[80%] gap-y-4 bg-gray-50">
        {loading ? (
          <Loader className="w-[15vh] h-[15vw]  text-muted animate-spin-slow hover:[animation-play-state:paused]" />
        ) : (
          <BadgePlus
            className="w-10 h-10 cursor-pointer text-muted animate-spin-slow hover:[animation-play-state:paused]"
            onClick={onClick}
          />
        )}
        <div className="text-xl text-muted">{emptyStateDescription}</div>
      </div>
    </div>
  );
}
