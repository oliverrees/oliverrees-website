import { format } from "date-fns";

interface DateProps {
  date: string;
  className?: string;
}

export const DateDisplay = ({ date, className }: DateProps) => {
  const parsedDate = new Date(date);
  return (
    <div className={"text-gray-400 text-sm mt-2 dark:text-white " + className}>
      {format(parsedDate, "dd/MM/yyyy")}
    </div>
  );
};
