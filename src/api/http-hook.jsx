import {useState, useCallback, useRef, useEffect} from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //cancel the http request.Ref: data not change
  const activeHttpRequest = useRef([]);


  // The call back function only get called when the deps changed
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);

    // const httpAbortController = new AbortController();
    // activeHttpRequest.current.push(httpAbortController);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,

      });
      const data = await response.json();
      // // filter out the old controllers
      // activeHttpRequest.current = activeHttpRequest.current.filter(
      //   ctrl => ctrl !== httpAbortController
      // );

      if (!response.ok) {
        throw new Error(data.message);
      }
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err);
      throw err;
    }


  }, []);

  const clearError = () => {
    setError(null);
  };
  //clean up
  useEffect(() => {
    return () => {activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort())};
  },[]) //never  re-run, only run when this component is mounted

  return {isLoading, error, sendRequest, clearError}
};
