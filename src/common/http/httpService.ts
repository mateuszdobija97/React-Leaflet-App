import { buildUrl } from '../url/urlBuilderService';

export const httpGet = (
  url: string,
  query: { [key: string]: any } = {}
): Promise<any> => {
  const fetchParams: RequestInit = { method: 'GET' };
  const requestUrl = buildUrl(url, query);

  return httpFetch(requestUrl, fetchParams);
};

const httpFetch = async (url: string, params?: RequestInit) => {
  try {
    const response: Response = await fetch(url, params);
    if (!response.ok) {
      throw response;
    }
    return response.json();
  } catch (error) {
    console.error('Fetch Error');
    throw error;
  }
};
