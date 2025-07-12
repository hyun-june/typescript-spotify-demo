import { Typography } from "@mui/material";
import useGetNewReleases from "../../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../../common/components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../../common/components/ErrorMessage/ErrorMessage";
import { Grid } from "@mui/material";
import Card from "../../../../common/components/Card/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("🚀 ~ NewReleases ~ data:", data);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2"> No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
