import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

// export default function ActivityDashBoard(props: Props)
//destructure way if just activites from props
export default function ActivityDashBoard() {
  return (
    <Grid container spacing={8}>
      {/* size is 8/12. 12 taks the whole screen width */}
      <Grid size={7}>
        <ActivityList />
      </Grid>
      <Grid size={5}>Activity Filter go here</Grid>
    </Grid>
  );
}
