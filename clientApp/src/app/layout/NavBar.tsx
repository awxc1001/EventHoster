import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

type Props = {
  openForm: () => void;
}
export default function NavBar({openForm}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              <MenuItem sx={{ display: "flex", gap: 3 }}>
                <Group fontSize="large" />
                <Typography variant="h5" fontWeight="bold">
                  Activity Event Hoster
                </Typography>
              </MenuItem>
            </Box>
            < Box sx={{ display: "flex", ml:70}}>
              <MenuItem sx={{
                fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold"
              }}>
                Activities
              </MenuItem>
               <MenuItem sx={{
                fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold"
              }}>
                About
              </MenuItem>
                <MenuItem sx={{
                fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold"
              }}>
                Contact
              </MenuItem>
            </Box>
            <Button size="medium" variant="contained" color="warning" onClick={openForm}>Create Activity</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
