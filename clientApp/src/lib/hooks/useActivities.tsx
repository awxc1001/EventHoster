import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAgent from "../api/agent";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();

  //isPending is when the a request is processing regardless of it being the first time or a refetch
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await axiosAgent.get<Activity[]>("/activities");
      console.log("agent FETCHED ACTIVITIES", res.data);
      return res.data; // <- 记得 return
    },
  });

  //isLoading is when the query is in loading state for the first time
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const res = await axiosAgent.get<Activity>(`/activities/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await axiosAgent.put("/activities", activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const CreateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await axiosAgent.post("/activities", activity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await axiosAgent.delete(`/activities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity: CreateActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
