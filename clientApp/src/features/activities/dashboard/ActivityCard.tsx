import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
};
export default function ActivityCard({
  activity,
  selectActivity,
  deleteActivity,
}: Props) {
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
          <Button
            onClick={() => selectActivity(activity.id)}
            size="small"
            variant="contained"
          >
            View
          </Button>
          <Button
            onClick={() => deleteActivity(activity.id)}
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
