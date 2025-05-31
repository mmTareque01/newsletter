// interface URLParams {
//   pageSize?: number;
//   pageNo?: number;
//   search?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
//   [key: string]: string | number | boolean | undefined;
// }

// export const generateURL = (baseURL: string, params: URLParams): string => {
//   const url = new URL(baseURL);
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== null) {
//       url.searchParams.append(key, String(value));
//     }
//   });
//   return url.toString();
// };

interface URLParams {
  pageSize?: number;
  pageNo?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export const generateURL = (uri: string, params: URLParams): string => {
  // Check if the URI already has query params
  const hasExistingParams = uri.includes("?");
  const separator = hasExistingParams ? "&" : "?";

  // Filter out undefined/null params and convert to key=value strings
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  // Append the new query string to the URI
  return queryString ? `${uri}${separator}${queryString}` : uri;
};
