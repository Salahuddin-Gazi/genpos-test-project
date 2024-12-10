interface Options {
  companyBody: {
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
  };
  revalidate?: number | false | undefined;
}

export const fetchCompanyList = async (props: Options) => {
  const apiUrlCompanies = process.env.NEXT_PUBLIC_API_URL || '';
  const token = process.env.NEXT_PUBLIC_TOKEN || null;

  try {
    const response = await fetch(apiUrlCompanies, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json-patch+json',
      },
      body: JSON.stringify(props.companyBody),
      next: {
        revalidate: props.revalidate,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch company list data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching company list:', error);
    throw error;
  }
};
