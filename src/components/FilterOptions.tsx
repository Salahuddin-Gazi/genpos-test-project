import { useState } from "react";
import { AngleRight, BinIcon, SearchMdIcon } from "./icons";

interface Option {
  optionsData: any;
  handleSubmit: (formData: FormData) => void;
}

interface Group {
  disabled: boolean;
  group: string | null;
  selected: boolean;
  text: string | null;
  value: string | null;
}

interface FormData {
  companyName: string | null;
  group: number;
  vat: number | null;
  activeStatus: number;
}

export default function FilterOptions({ optionsData, handleSubmit }: Option) {
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showActiveStatus, setShowActiveStatus] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("All");
  const [currentActiveStatus, setCurrentActiveStatus] = useState("All");

  const [formData, setFormData] = useState<FormData>({
    companyName: null,
    group: 0,
    vat: null,
    activeStatus: 0,
  });

  const handleButtonClick = (option?: string) => {
    setShowGroupOptions(option === "group" ? !showGroupOptions : false);
    setShowActiveStatus(option === "active_status" ? !showActiveStatus : false);
  };

  const handleOptionClick = (
    type: "group" | "activeStatus",
    value: string | null,
    text: string | null
  ) => {
    if (value && text) {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        setFormData((prev) => ({ ...prev, [type]: numericValue }));
        type === "group" ? setCurrentGroup(text) : setCurrentActiveStatus(text);
      }
    }
    handleButtonClick(type);
  };

  const handleClear = () => {
    setShowGroupOptions(false);
    setShowActiveStatus(false);
    setFormData({ companyName: null, group: 0, vat: null, activeStatus: 0 });
    setCurrentGroup("All");
    setCurrentActiveStatus("All");

    handleSubmit({ companyName: null, group: 0, vat: null, activeStatus: 0 });
  };

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="p-4 border shadow-sm">
      <form className="flex gap-y-4 flex-col" onSubmit={onHandleSubmit}>
        <div className="flex gap-x-2">
          <div className="flex flex-col gap-y-2 flex-1">
            <label className="font-semibold">Company name</label>
            <input
              className="text-sm p-2 focus:outline-blue-400 focus:ring-1 border rounded-sm"
              placeholder="Company name"
              value={formData.companyName || ""}
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyName: e.target.value || null,
                }))
              }
              name="company_name"
              onClick={() => handleButtonClick()}
            />
          </div>

          {optionsData.availableGroups?.length > 0 && (
            <div className="flex flex-col gap-y-2 flex-1 relative">
              <label className="font-semibold">Group</label>
              <button
                className="text-sm p-2 focus:outline-blue-400 focus:ring-1 border rounded-sm flex justify-between items-center cursor-pointer"
                type="button"
                onClick={() => handleButtonClick("group")}
                name="group"
              >
                <span className="line-clamp-1 text-left">{currentGroup}</span>
                <div className="border-l pl-1 border-[#c0c4cc]">
                  <AngleRight className="w-[18px] h-[18px] rotate-90" />
                </div>
              </button>
              <div
                className={`border shadow-sm absolute top-[calc(100%+10px)] left-0 flex flex-col w-full bg-white ${showGroupOptions ? "flex" : "hidden"
                  }`}
              >
                {optionsData.availableGroups.map((grp: Group) => (
                  <div
                    key={grp.value}
                    className={`cursor-pointer line-clamp-1 p-2 leading-8 ${currentGroup === grp.text
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-200"
                      }`}
                    onClick={() =>
                      handleOptionClick("group", grp.value, grp.text)
                    }
                  >
                    {grp.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-y-2 flex-1">
            <label className="font-semibold">Vat number</label>
            <input
              className="text-sm p-2 focus:outline-blue-400 focus:ring-1 border rounded-sm"
              placeholder="Vat number"
              value={formData.vat || ""}
              type="number"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vat: parseInt(e.target.value, 10) || null,
                }))
              }
              name="vat_number"
              min={0}
              onClick={() => handleButtonClick()}
            />
          </div>

          {optionsData.availableActiveOptions?.length > 0 && (
            <div className="flex flex-col gap-y-2 flex-1 relative">
              <label className="font-semibold">Active</label>
              <button
                className="text-sm p-2 focus:outline-blue-400 focus:ring-1 border rounded-sm flex justify-between items-center cursor-pointer"
                type="button"
                onClick={() => handleButtonClick("active_status")}
                name="active_status"
              >
                <span className="line-clamp-1 text-left">
                  {currentActiveStatus}
                </span>
                <div className="border-l pl-1 border-[#c0c4cc]">
                  <AngleRight className="w-[18px] h-[18px] rotate-90" />
                </div>
              </button>
              <div
                className={`border shadow-sm absolute top-[calc(100%+10px)] left-0 flex flex-col w-full bg-white ${showActiveStatus ? "flex" : "hidden"
                  }`}
              >
                {optionsData.availableActiveOptions.map((grp: Group) => (
                  <div
                    key={grp.value}
                    className={`cursor-pointer line-clamp-1 p-2 leading-8 ${currentActiveStatus === grp.text
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-200"
                      }`}
                    onClick={() =>
                      handleOptionClick("activeStatus", grp.value, grp.text)
                    }
                  >
                    {grp.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <button
            className="flex justify-start items-center gap-x-2 p-2 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            <SearchMdIcon className="w-[18px] h-[18px]" />
            Search
          </button>
          <button
            className="flex justify-start items-center gap-x-2 p-2 bg-[#eaeaea] rounded-md"
            type="button"
            onClick={handleClear}
          >
            <BinIcon className="w-[18px] h-[18px]" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
