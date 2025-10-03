import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity?: Activity | null;
  closeForm: () => void;
};
export default function ActivityForm({ activity, closeForm }: Props) {
  // Helper to format date for datetime-local input
  function formatDateForInput(dateString?: string | null) {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Pad with zeros for month, day, hour, minute
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };
  return (
    <Paper sx={{ borderRadius: 5, p: 2 }}>
      <Typography variant="h4" color="primary" textAlign="center">
        Create Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          type="datetime-local"
          defaultValue={formatDateForInput(activity?.date)}
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
