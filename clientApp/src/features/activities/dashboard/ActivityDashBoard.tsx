import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activites: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: Activity | null;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editMode: boolean;
};
// export default function ActivityDashBoard(props: Props)
//destructure way if just activites from props
export default function ActivityDashBoard({
  activites,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
}: Props) {
  return (
    <Grid container spacing={8}>
      {/* size is 8/12. 12 taks the whole screen width */}
      <Grid size={7}>
        <ActivityList activities={activites} selectActivity={selectActivity}/>
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode &&
        <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
      </Grid>
    </Grid>
  );
}
