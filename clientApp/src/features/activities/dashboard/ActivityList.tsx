import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityList() {
   const { activities, isPending } = useActivities();

   if (isPending || !activities) return <Typography>Loading activities...</Typography>;
  return (
    <Box sx={{ flexDirection: "column", display: "flex", gap: 2, mt: 2 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </Box>
  );
}
