import SessionTable from "@/app/(main)/(exam)/_components/session-table";

export default function SessionPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-screen-lg w-full px-6 md:max-w-screen-xl sm:px-10">
        <h2 className="text-2xl  md:text-3xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          測驗列表
        </h2>
        <SessionTable />
      </div>
    </div>
  );
}
