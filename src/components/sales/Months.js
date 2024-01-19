import { months } from "../../helper"
import "./Months.css"

export const Months = ({ setSelectedMonth }) => {
	return (
		<select
			className="months month-dropdown"
			onChange={(event) => {
				setSelectedMonth(event.target.value)
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
