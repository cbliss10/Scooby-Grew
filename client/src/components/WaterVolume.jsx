export const WaterVolume = (props) => {
	return (
		<>
			<label>Water Volume</label>
			<input
				type="text"
				value={props.volume}
				onChange={(e) => props.setVolume(e.target.value)}
			/>
		</>
	);
};
