import {
	BarChart,
	BarSeries,
	BarLabel,
	Bar,
	PieChart,
	PieArcSeries,
	LineChart,
	LineSeries,
	CalendarHeatmap,
	AreaChart,
	AreaSeries,
	Area,
	Stripes,
	Gradient,
	GradientStop,
	Line
} from "reaviz";
import { Grid, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../scripts/global";
import moment from "moment";
import range from "lodash/range";

const distanceData = [
	{ key: "Monday", data: 14 },
	{ key: "Tuesday", data: 5 },
	{ key: "Wednesday", data: 16 },
	{ key: "Thursday", data: 10 },
	{ key: "Friday", data: 8 },
	{ key: "Saturday", data: 15 },
	{ key: "Sunday", data: 12 }
];

const machineData = [
	{ key: "Elliptical", data: 2 },
	{ key: "Treadmill", data: 3 },
	{ key: "Stationary Bike", data: 1 },
	{ key: "Rowing Machine", data: 3 },
	{ key: "Stairmaster", data: 6 },
	{ key: "Deadlift", data: 5 },
	{ key: "Lat Pull", data: 5 }
];

export const singleDateData = [
	{ id: "0", key: new Date("2020-02-17T08:00:00.000Z"), data: 140 },
	{ id: "1", key: new Date("2020-02-21T08:00:00.000Z"), data: 180 },
	{ id: "2", key: new Date("2020-02-26T08:00:00.000Z"), data: 110 },
	{ id: "3", key: new Date("2020-02-29T08:00:00.000Z"), data: 120 },
	{ id: "", key: new Date(""), data: 300 }
];

const DistanceBarChart = () => (
	<BarChart
		width={350}
		height={250}
		data={distanceData}
		centerY={true}
		series={
			<BarSeries
				bar={<Bar label={<BarLabel fill={"#fff"} position='center' />} />}
			/>
		}
	/>
);

const yearStart = moment().startOf("year");
const month = moment().month();
export const marchHeatMapData = range(31).map((i) => ({
	key: yearStart.clone().add(month, "month").add(i, "days").toDate(),
	data: Math.floor(Math.random() * 100)
}));

const CalendarHeatmapChart = () => (
	<CalendarHeatmap
		width={350}
		height={250}
		view='month'
		data={marchHeatMapData}
		colorRange={["#f7fbff", "#08306b"]}
	/>
);

const MachinePieChart = () => (
	<PieChart
		width={350}
		height={270}
		data={machineData}
		series={
			<PieArcSeries
				innerRadius={0.5}
				padAngle={0.02}
				cornerRadius={3}
				labels={({ datum }) => `${datum.key}: ${datum.data}`}
				animated={true}
			/>
		}
	/>
);

const WeightLineChart = () => (
	<LineChart width={350} height={250} data={singleDateData} />
);

export const workoutDurationData = [
	{ id: "0", key: new Date("2020-02-17T08:00:00.000Z"), data: 21 },
	{ id: "1", key: new Date("2020-02-21T08:00:00.000Z"), data: 28 },
	{ id: "2", key: new Date("2020-02-26T08:00:00.000Z"), data: 12 },
	{ id: "3", key: new Date("2020-02-29T08:00:00.000Z"), data: 20 }
];

const WorkoutDurationChart = () => (
	<AreaChart
		width={350}
		height={250}
		data={workoutDurationData}
		series={
			<AreaSeries
				area={
					<Area
						mask={<Stripes />}
						gradient={
							<Gradient
								stops={[
									<GradientStop offset='10%' stopOpacity={0} />,
									<GradientStop offset='80%' stopOpacity={1} />
								]}
							/>
						}
					/>
				}
				line={<Line strokeWidth={3} />}
			/>
		}
	/>
);

export const generateDate = (offset) =>
	moment().startOf("day").subtract(offset, "days").toDate();
const dateOffsets = [14, 10, 5, 2];

const generateBaseDateData = (offsets = dateOffsets) =>
	offsets.map((offset) => ({ offset, data: Math.floor(Math.random() * 11) }));

export const generateDateData = (baseData = generateBaseDateData()) =>
	baseData.map((item, index) => ({
		id: index.toString(),
		key: generateDate(item.offset),
		data: item.data
	}));

const multiDateData = [
	{
		key: "Effort Level",
		data: generateDateData()
	},
	{
		key: "Tiredness Level",
		data: generateDateData()
	}
];

const EffortTirednessChart = () => (
	<LineChart
		width={350}
		height={250}
		series={
			<LineSeries
				type='grouped'
				line={
					<Line
						strokeWidth={3}
						style={(data) => {
							if (
								data &&
								data.length &&
								data[0] &&
								data[0].key === "Threat Intel"
							) {
								console.log("Style callback...", data);
								return {
									strokeDasharray: "5"
								};
							}
						}}
					/>
				}
				colorScheme={["#08306b", "#08519c", "#2171b5"]}
			/>
		}
		data={multiDateData}
	/>
);

export default function Reports() {
	const user = useSelector((state) => state.user);

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "105vh"
			}}>
			<Typography
				variant='h2'
				align='center'
				sx={{
					paddingBottom: 4
				}}>
				{capitalizeFirstLetter(user.username)}'s Reports
			</Typography>
			<br></br>
			<Grid
				container
				rowSpacing={5}
				columnSpacing={{ xs: 10 }}
				sx={{
					paddingRight: "30px"
				}}>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={5}>
						Effort and Tiredness
					</Typography>
					<EffortTirednessChart />
				</Grid>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={2}>
						Machines Used
					</Typography>
					<MachinePieChart />
				</Grid>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={2}>
						Weight Over Time
					</Typography>
					<WeightLineChart />
				</Grid>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={2}>
						Days Worked Out in {moment().format("MMMM")}
					</Typography>
					<CalendarHeatmapChart />
				</Grid>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={2}>
						Workout Duration
					</Typography>
					<WorkoutDurationChart />
				</Grid>
				<Grid item xs={4}>
					<Typography variant='h6' align='start' ml={2}>
						Cardio Distances
					</Typography>
					<DistanceBarChart />
				</Grid>
			</Grid>
		</Container>
	);
}
