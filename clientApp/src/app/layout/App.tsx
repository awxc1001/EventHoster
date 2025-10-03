import { Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { useActivities } from "../../lib/hooks/useActivities";


function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  //custom hook
  const {activities, isPending} = useActivities();


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((a) => a.id === id) ?? null);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(null);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  // const handleSubmitForm = (activity: Activity) => {
  //   if (activity.id) {
  //     // 有 id = 编辑
  //     // setActivites(activities.map((x) => (x.id === activity.id ? activity : x)));
  //   } else {
  //     // 没 id = 新增
  //     // const newActivity = { ...activity, id: (activities!.length + 1).toString() };
  //     // setSelectedActivity(newActivity);
  //     // setActivites([...(activities ?? []), newActivity]);
  //   }
  //   console.log("SUBMIT", activity);
  //   setEditMode(false);
  // };

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {isPending || !activities ? (
          <Typography variant="h3" color="primary">
            Loading activities...
          </Typography>
        ) : (
          <ActivityDashBoard
            activites={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        )}
      </Container>
    </>
  );
}

export default App;
