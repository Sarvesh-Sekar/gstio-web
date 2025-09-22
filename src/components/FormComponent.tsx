type FormComponentProps = {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};
export default function FormComponent({
  title = "",
  subtitle = "",
  icon,
  children,
}: FormComponentProps) {
  return (
    <div className="border-2  border-black bg-gray-200 rounded-md   p-2 flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-2 ">
        {icon && <div>{icon}</div>}
        <div className="flex flex-col w-full gap-y-4">
          {" "}
          <div>
            <div className="text-2xl">{title}</div>
            <div className="text-muted">{subtitle}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
