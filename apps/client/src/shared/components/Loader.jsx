import { Box, CircularProgress } from "@mui/material";

//Loader component
export default function Loader() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<CircularProgress
				sx={{
					color: "primary.main",
				}}
			/>
		</Box>
	);
}