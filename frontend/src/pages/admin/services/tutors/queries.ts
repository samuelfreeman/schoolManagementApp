import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTutors,
  fetchTutor,
  deleteTutor,
  registerTutor,
  updateTutor,
} from "./api";
import { toast } from "@/hooks/use-toast";

/**
 * @Query Hook to fetch all tutors
 */
export const useFetchAllTutors = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: fetchAllTutors,
  });
};

/**
 * @Query Hook to fetch a single tutor
 */
export const useFetchTutor = (id: string) => {
  return useQuery({
    queryKey: ["tutor", id],
    queryFn: () => fetchTutor(id),
  });
};

/**
 * @Mutation Hook to create a tutor
 */
export const useCreateTutor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateTutor) => registerTutor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
      toast({
        variant: "default",
        type: "background",
        title: "Tutor created!",
        description: "The tutor has been created",
      });
      navigate("/admin/tutors");
    },
  });
};

/**
 * @Mutation Hook to update a tutor
 */
export const useUpdateTutor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UpdateTutor) => updateTutor(data?.id ?? "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
      toast({
        variant: "default",
        type: "background",
        title: "Tutor updated!",
        description: "The tutor has been updated",
      });
      navigate("/admin/tutors");
    },
  });
};

/**
 * @Mutation Hook to delete a tutor
 */
export const useDeleteTutor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTutor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
      toast({
        variant: "destructive",
        title: "Tutor deleted!",
        description: "The tutor has been deleted",
      });
    },
  });
};
