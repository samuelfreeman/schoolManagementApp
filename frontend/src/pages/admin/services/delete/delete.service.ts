import { api } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminDeleteResource = (resource: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", resource],
    mutationFn: (id: string | number) => api.delete(`/${resource}/${id}`),
    onMutate: (id) => {
      toast({
        title: "Deleting",
        description: `Deleting ${resource} with ID ${id}...`,
      });
    },
    onSuccess: () => {
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      toast({
        title: "Success",
        description: `${resource} deleted successfully.`,
      });
    },
    onError: (error, id) => {
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to delete ${resource} with ID ${id}.`,
      });
    },
  });
};
