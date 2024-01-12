export const SalesList = () => {
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

	// const [allSales, setAllSales]

	return (
		<>
			<div className="sales-report">
				<h2>Sales Report</h2>
				<div className="months-div">
					<select className="month-dropdown">
						<option value={0} className="month month-option">
							All Months
						</option>
						{months.map((monthObj) => {
							return (
								<option
									value={monthObj.id}
									className="month-option"
									key={monthObj.id}
								>
									{monthObj.month}
								</option>
							)
						})}
					</select>
				</div>
			</div>
		</>
	)
}
