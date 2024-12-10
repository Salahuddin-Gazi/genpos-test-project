import DashboardOptions from "./DashboardOptions";

export default function LeftBar() {
  return <div className="fixed top-0 left-0 w-[250px] bg-[#fafafa] h-full p-4 shadow-md">
    <h1 className="font-extrabold text-2xl uppercase">Genpos</h1>
    <DashboardOptions />
  </div>
}