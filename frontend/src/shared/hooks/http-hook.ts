import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const activeHttpRequests = useRef<any>([]); 

  const sendRequest = useCallback(  
    async (url: string, method = "GET", body: any = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController(); // canceling ongoing request if user left the page before it was completed
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        // remove abortcontroller which belongs to the completed request
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl: any) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
        
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
          throw err;
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((AbortController: any) =>
        AbortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
