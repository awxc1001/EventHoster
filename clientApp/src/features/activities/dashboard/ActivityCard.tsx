import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { NavLink } from "react-router";

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  const { deleteActivity } = useActivities();

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 5, border: "1px solid", borderColor: "grey.400" }} // 或 'divider'
    >
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={activity.category} variant="outlined" />
        <Box gap={2} display="flex">
          <Button component={NavLink} to={`/activities/${activity.id}`} size="small" variant="contained">
            View
          </Button>
          <Button
            onClick={() => deleteActivity.mutateAsync(activity.id)}
            disabled={deleteActivity.isPending}
            size="small"
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
