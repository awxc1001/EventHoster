import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAgent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();
    
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await axiosAgent.get<Activity[]>("/activities");
      console.log("agent FETCHED ACTIVITIES", res.data);
      return res.data; // <- 记得 return
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await axiosAgent.put("/activities", activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    } 
  });

  const CreateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await axiosAgent.post("/activities", activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await axiosAgent.delete(`/activities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });

  return { activities, isPending, updateActivity, createActivity: CreateActivity, deleteActivity };
};
