interface Options {
  revalidate?: number | false | undefined;
}

export const fetchOptions = async (props: Options) => {
  const apiUrlOptions = process.env.NEXT_PUBLIC_API_URL || '';
  const token = process.env.NEXT_PUBLIC_TOKEN || null;

  try {
    const response = await fetch(apiUrlOptions, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: props.revalidate,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch options data');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch options data:', error);
    throw error;
  }
};
