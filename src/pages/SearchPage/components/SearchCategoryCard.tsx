import { Box, styled, Typography } from "@mui/material";

interface CategoryProps {
  label: string;
  bgcolor: string;
  img: string;
  category: string;
}

const CategoryCard = styled("div")<{ bgcolor: string }>(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  aspectRatio: "2/1",
  overflow: "hidden",
  borderRadius: "8px",
  padding: "10px",
  position: "relative",
}));

const CategoryImage = styled("img")({
  transform: "rotate(30deg)",
  width: "clamp(100px,12vw,200px)",
  position: "absolute",
  right: "-30px",
  bottom: "-30px",
});

const SearchCategoryCard = ({
  label,
  bgcolor,
  img,
  category,
}: CategoryProps) => {
  //   console.log("🚀 ~ SearchCategoryCard ~ category:", category);
  return (
    <CategoryCard bgcolor={bgcolor}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        {label}
      </Typography>
      <CategoryImage src={img} />
    </CategoryCard>
  );
};

export default SearchCategoryCard;
