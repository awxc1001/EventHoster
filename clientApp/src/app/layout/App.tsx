import { Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const [activites, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivites(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites.find((a) => a.id === id) ?? null);
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      // 有 id = 编辑
      setActivites(activites.map((x) => (x.id === activity.id ? activity : x)));
    } else {
      // 没 id = 新增
      //shallow copy, then add id
      const newActivity = {
        ...activity,
        id: (activites.length + 1).toString(),
      };
      setSelectedActivity(newActivity);
      setActivites([...activites, newActivity]);
    }
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    setActivites(activites.filter((x) => x.id !== id));
  };

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashBoard
          activites={activites}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
