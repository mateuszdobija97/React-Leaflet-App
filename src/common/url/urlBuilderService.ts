export const buildUrl = (
  url: string,
  queryParams: { [key: string]: any } = {}
): string => {

  return buildUrlRecursive(url, queryParams);
};

const buildUrlRecursive = (
  url: string,
  obj: { [key: string]: any } = {},
  objName: string = '',
  keyConcatSymbol: string = '.'
): string => {
  for (const key in obj) {
    url = getUrl(obj, key, url, objName, keyConcatSymbol);
  }

  return url.replace(/\./g, keyConcatSymbol);
};

const getUrl = (
  obj: { [key: string]: any } = {},
  key: string,
  url: string,
  objName: string,
  keyConcatSymbol: string
) => {
  let urlWithQuery = url;
  if (typeof obj[key] === 'object' && obj[key] !== null) {
    urlWithQuery = buildUrlRecursive(urlWithQuery, obj[key], key);
  } else {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      const param = getParamAsUrlString(key, obj, objName, keyConcatSymbol);

      urlWithQuery += (url.indexOf('?') !== -1 ? '&' : '?') + param;
    }
  }
  return urlWithQuery;
};

const getParamAsUrlString = (
  paramKey: string,
  obj: { [key: string]: any } = {},
  objName: string,
  keyConcatSymbol: string
) => {
  let key = paramKey;

  if (objName !== '') {
    key = `${objName}${keyConcatSymbol}${key}`;
  }

  const paramValue = escape(obj[key]);

  const param = `${key}=${paramValue}`;

  return param;
};
