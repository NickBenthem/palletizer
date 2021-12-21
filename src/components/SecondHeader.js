import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../App.css";

function SecondHeader() {
    return <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom>
          Palletizer
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph>
          Turn your photo into a palletized image.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center">
        </Stack>
      </Container>
    </Box>;
  }

  export default SecondHeader;