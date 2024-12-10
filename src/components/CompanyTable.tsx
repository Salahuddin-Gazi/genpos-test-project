import Image from "next/image"
import { BinIcon, CrossIcon, EditIcon, TickMdIcon } from "./icons"

export default function CompanyTable({ companiesData }: any) {
  return <div className="bg-[#f1f1f1] flex flex-col gap-y-1 mt-8 rounded-lg p-1 shadow-sm">
    <div className="flex p-3 gap-x-3 font-bold">
      <div className="flex-1">LOGO</div>
      <div className="flex-1">NAME</div>
      <div className="flex-1">GROUP</div>
      <div className="flex-1">VAT NUMBER</div>
      <div className="flex-1">ACTIVE</div>
      <div className="flex-1"></div>
    </div>

    {companiesData.map((data: any) =>
      <div key={data.id} className="flex bg-[#fafafa] px-4 py-3 gap-x-3">
        <div className="flex-1 justify-start items-center">
          <Image
            width={500}
            height={500}
            src={data.logoThumbnailUrl}
            alt={data.name}
            className="max-w-[60px] aspect-square"
          />
        </div>
        <div className="flex-1 flex justify-start items-center"><span className="line-clamp-1 w-full">{data.name}</span></div>
        <div className="flex-1 flex justify-start items-center"><span className="line-clamp-1 w-full">{data.groupName}</span></div>
        <div className="flex-1 flex justify-start items-center">{data.vatNumber}</div>
        <div className="flex-1 flex justify-start items-center">{data.active ? <TickMdIcon className="w-[14px] h-[14px] text-green-700" /> : <CrossIcon className="w-[14px] h-[14px] text-red-700" />}</div>
        <div className="flex-1 flex justify-start items-center gap-x-1">
          <button className="border p-1"><EditIcon className="w-[18px] h-[18px]" /></button>
          <button className="border p-1"><BinIcon className="w-[18px] h-[18px]" /></button>
        </div>
      </div>
    )}
  </div>
}