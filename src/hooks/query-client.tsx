import { QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Toast } from "@/ui-kit/toast/toast";

/**
 * Creates and returns a new instance of `QueryClient` with a custom error handling mechanism.
 * QueryClient is a class that manages queries and caches the results. It is used to manage the
 * state of queries and provides a set of hooks to interact with the query cache.
 * 
 * The `QueryClient` is configured with a `QueryCache` that triggers a custom toast notification
 * when an error occurs during a query. The toast notification is displayed at the bottom-left
 * of the screen and automatically dismisses after 500 milliseconds.
 * 
 * @returns {QueryClient} A new instance of `QueryClient` with custom error handling.
 */
export const useTableQueryClient = (): QueryClient => {
  const errorToastId = "error-toast";
  
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: () => {
        toast.custom(<Toast onClose={() => toast.dismiss(errorToastId)}/>, {
          id: errorToastId,
          position: "bottom-left",
          duration: 500,
        });
      },
    }),
  })

  return client
};
