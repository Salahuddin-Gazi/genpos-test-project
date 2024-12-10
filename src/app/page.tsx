import LeftBar from "@/components/LeftBar";
import RightSide from "@/components/RightSide";
import { fetchCompanyList } from "@/utils/fetchCompanyLists";
import { notFound } from "next/navigation";
import { fetchOptions } from "@/utils/fetchOptions";

export default async function Home() {
  try {
    // Fetch options data
    const optionsData = await fetchOptions({ revalidate: 3600 });

    // Fetch company list data
    const companyBody = {
      searchGroupId: 0,
      searchCompanyName: null,
      searchVatNumber: null,
      searchActiveId: 0,
      page: 1,
      pageSize: 25,
      availablePageSizes: ["15", "25", "50", "100"],
      draw: null,
      start: 0,
      length: 15,
    };

    const companiesData = await fetchCompanyList({ companyBody, revalidate: 3600 });
    if (optionsData.data && companiesData.data)
      return (
        <div className="relative bg-[#fafafa]">
          <LeftBar />
          <RightSide optionsData={optionsData.data} companiesData={companiesData.data}/>
        </div>
      );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}