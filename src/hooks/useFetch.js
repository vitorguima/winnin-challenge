import useSWR from 'swr';

export default function useFetch(url) {
  // eslint-disable-next-line no-shadow
  const { data, error } = useSWR(url, async (url) => {
    const response = await fetch(url);
    // eslint-disable-next-line no-shadow
    const json = await response.json();
    return json;
  });
  return { data, error };
}
