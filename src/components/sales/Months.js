import "./Months.css"

export const Months = ({ setMonth }) => {
	const months = [
		{ id: 1, month: "January" },
		{ id: 2, month: "February" },
		{ id: 3, month: "March" },
		{ id: 4, month: "April" },
		{ id: 5, month: "May" },
		{ id: 6, month: "June" },
		{ id: 7, month: "July" },
		{ id: 8, month: "August" },
		{ id: 9, month: "September" },
		{ id: 10, month: "October" },
		{ id: 11, month: "November" },
		{ id: 12, month: "December" },
	]

	return (
		<select
			className="months month-dropdown"
			onChange={(event) => {
				setMonth(event.target.value)
			}}
		>
			<option value={0} className="month month-option">
				All Months
			</option>
			{months.map((monthObj) => {
				return (
					<option
						value={monthObj.id}
						className="month month-option"
						key={monthObj.id}
					>
						{monthObj.month}
					</option>
				)
			})}
		</select>
	)
}
