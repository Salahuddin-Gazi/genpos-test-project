"use client"

import { useState } from "react";
import { PurchaseIcon, BusinessIcon, CatalogIcon, ConfigurationIcon, FolderIcon, SystemIcon, UserIcon, AngleRight, BigDot } from "./icons";
import { MdiDot } from "./icons/MdiDot";

const options = [
  { title: "Dashboard", options: [], icon: FolderIcon },
  {
    title: "Purchase",
    options: ["Purchase-1", "Purchase-2", "Purchase-3"],
    icon: PurchaseIcon
  },
  {
    title: "Business Unit",
    options: ["Groups", "Companies", "Brands", "Outlets", "Warehouses"],
    icon: BusinessIcon
  },
  {
    title: "Catalog",
    options: ["Catalog-1", "Catalog-2", "Catalog-3"],
    icon: CatalogIcon
  },
  {
    title: "User",
    options: ["User-1", "User-2", "User-3"],
    icon: UserIcon
  },
  {
    title: "Configurations",
    options: ["Configurations-1", "Configurations-2", "Configurations-3"],
    icon: ConfigurationIcon
  },
  {
    title: "System",
    options: ["System-1", "System-2", "System-3"],
    icon: SystemIcon
  },
];

export default function DashboardOptions() {
  const [activeMainOption, setActiveMainOption] = useState<string | null>('Business Unit');
  const [activeSubOption, setActiveSubOption] = useState<string | null>('Companies');

  const handleMainOptionClick = (title: string, subOptions: string[]) => {
    if (activeMainOption === title) {
      // Collapse the option if it's already active
      setActiveMainOption(null);
      setActiveSubOption(null);
    } else {
      // Expand the clicked option and auto-select its first sub-option
      setActiveMainOption(title);
      setActiveSubOption(subOptions[0] || null);
    }
  };

  const handleSubOptionClick = (subTitle: string) => {
    setActiveSubOption(subTitle);
  };

  return (
    <div className="mt-8 flex flex-col gap-y-2">
      {options.map((mainOption) => {
        const Icon = mainOption.icon;
        return (
          <div key={mainOption.title}>
            {/* Main Option */}
            <div
              className={`p-2 cursor-pointer flex gap-x-2 justify-start items-center relative ${activeMainOption === mainOption.title
                ? "text-blue-500"
                : "text-black"
                }`}
              onClick={() =>
                handleMainOptionClick(mainOption.title, mainOption.options)
              }
            >
              <Icon className="h-[18px] w-[18px] aspect-square" />
              <span className="text-base">{mainOption.title}</span>
              {mainOption.options.length > 0 && (
                <AngleRight className={`h-[18px] w-[18px] absolute top-[12px] right-0 ${activeMainOption === mainOption.title
                  ? "rotate-90"
                  : ""
                  }`} />
              )}
            </div>

            {/* Sub-Options */}
            {mainOption.options.length > 0 &&
              activeMainOption === mainOption.title && (
                <div className="mt-2">
                  {mainOption.options.map((subOption) => (
                    <div
                      key={subOption}
                      className={`p-2 cursor-pointer flex gap-x-2 justify-start items-center ${activeSubOption === subOption
                        ? "text-blue-500"
                        : "text-black"
                        }`}
                      onClick={() => handleSubOptionClick(subOption)}
                    >
                      {activeSubOption === subOption
                        ? <BigDot className="h-[21px] w-[18px] font-bold flex justify-start items-center" />
                        : <MdiDot className="h-[18px] w-[18px] font-bold flex justify-start items-center" />
                      }
                      <span className="text-[14px]">{subOption}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )
      })}

    </div>
  );
}
