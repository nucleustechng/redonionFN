import { Skeleton, Stack, Grid } from "@mui/material";
import { Box } from "@mui/system";

const CardImageSkeleton = () => {
  return (
    <Skeleton animation="wave" variant="rectangular" width={210} height={175} />
  );
};

const TableSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((fm) => (
        <Skeleton
          key={fm}
          variant="text"
          animation="wave"
          width={"100%"}
          height={80}
        />
      ))}
    </>
  );
};

const ComponentSkeleton = () => {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={"100%"}
      height={500}
    />
  );
};

const MenuSkeleton = () => {
  return (
    <Skeleton animation="wave" variant="rectangular" width={150} height={300} />
  );
};

const CoinFilterSkeleton = ({ direction = "row" }) => {
  return (
    <Stack direction={direction} spacing={3}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={50}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={50}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={50}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={50}
      />
    </Stack>
  );
};

const CardSkeleton = () => {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={"100%"}
      height={200}
    />
  );
};

const GridCardSkeleton = ({
  columns,
  spacing,
  gap = 0,
  rowGap,
  columnGap,
  md,
  xs = 1,
  sm,
  xl,
}) => {
  return (
    <Grid
      container
      mt={2}
      columns={columns}
      columnGap={columnGap}
      spacing={spacing}
      gap={gap}
      rowGap={rowGap}
    >
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Grid item key={index} md={md} xl={xl} sm={sm} xs={12}>
          <Skeleton animation="wave" width={"100%"} height={250} />
        </Grid>
      ))}
    </Grid>
  );
};

const ModalSkeletons = ({ width, height }) => {
  return (
    <Box   borderRadius={1}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={width}
        height={height}
      />
    </Box>
  );
};

const AccountCardSkeletons = ({ width }) => {
  return (
    <Box my={3} width={width}>
      <Stack direction="row" spacing={2}>
        <Box width={"100%"}>
          <Skeleton variant="text" height={50} width={"40%"} />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          width={"100%"}
        >
          <Skeleton variant="text" height={50} width={"100%"} />
          <Skeleton variant="text" height={50} width={"100%"} />
        </Stack>
      </Stack>
      <Skeleton
        sx={{ borderRadius: "5px" }}
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={200}
      />
    </Box>
  );
};

const StaticPageSkeleton = () => {
  return (
    <Box mt={3}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={80}
        animation="wave"
      />
      {[1, 2, 3].map((index) => (
        <Box key={index} my={3}>
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton
              key={index}
              variant="text"
              width={"100%"}
              animation="wave"
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export {
  CardImageSkeleton,
  TableSkeleton,
  ComponentSkeleton,
  MenuSkeleton,
  CoinFilterSkeleton,
  CardSkeleton,
  GridCardSkeleton,
  ModalSkeletons,
  AccountCardSkeletons,
  StaticPageSkeleton,
};
