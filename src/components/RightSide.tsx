"use client";

import React, { useState, useEffect } from "react";
import FilterOptions from "./FilterOptions";
import { fetchCompanyList } from "@/utils/fetchCompanyLists";
import CompanyTable from "./CompanyTable";
import BottomPagination from "./BottomPagination";
import TopHeader from "./TopHeader";

interface Data {
  companiesData: any;
  optionsData: any;
}

interface FormData {
  companyName: string | null;
  group: number;
  vat: number | null;
  activeStatus: number;
}

interface PaginationData {
  page: number;
  pageSize: number;
}

interface CompanyBody {
  searchGroupId: number;
  searchCompanyName: string | null;
  searchVatNumber: number | null;
  searchActiveId: number;
  page: number;
  pageSize: number;
  availablePageSizes: string[];
  draw: number | null;
  start: number;
  length: number;
}

export default function RightSide(props: Data) {
  const [companiesData, setCompaniesData] = useState(props.companiesData.data);
  const [bodyData, setBodyData] = useState<CompanyBody>({
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
  });

  const handleSubmit = async (formData: FormData) => {
    const { activeStatus, companyName, group, vat } = formData;
    const companyBody = {
      ...bodyData,
      searchGroupId: group,
      searchCompanyName: companyName,
      searchVatNumber: vat,
      searchActiveId: activeStatus,
    };

    setBodyData(companyBody);

    const companiesData = await fetchCompanyList({ companyBody, revalidate: 3600 });

    if (companiesData.data.data) setCompaniesData(companiesData.data.data);
  };

  const handlePagination = async (paginationData: PaginationData) => {
    const { page, pageSize } = paginationData;
    const companyBody = {
      ...bodyData,
      page,
      pageSize,
    };
    setBodyData(companyBody);
    const companiesData = await fetchCompanyList({ companyBody, revalidate: 3600 });

    if (companiesData.data.data) setCompaniesData(companiesData.data.data);
  };

  return (
    <div className="ml-[270px] pt-4 pr-4 relative">
      <TopHeader />

      <div className="pt-[50px]">
        <h2 className="text-xl font-extrabold my-4">List of companies</h2>
        <FilterOptions optionsData={props.optionsData} handleSubmit={handleSubmit} />

        <CompanyTable companiesData={companiesData} />

        <BottomPagination
          optionsData={props.optionsData}
          companiesData={props.companiesData}
          visibleData={companiesData}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
}
