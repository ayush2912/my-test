import { useSearchParams } from "react-router-dom";

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string,
): readonly [
  searchParamsState: string,
  setSearchParamsState: (newState: string) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: string) => {
    console.log(`inside ${searchParamName} before`, searchParams.toString());
    if (searchParams.get(searchParamName)) searchParams.delete(searchParamName);
    searchParams.set(searchParamName, newState);
    console.log(`inside ${searchParamName} after`, searchParams.toString());
    setSearchParams(searchParams);
  };

  return [searchParamsState, setSearchParamsState];
}
