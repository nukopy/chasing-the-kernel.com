const padDatePart = (value: number) => String(value).padStart(2, "0");

export const formatDate = (date: Date) =>
	[
		date.getUTCFullYear(),
		padDatePart(date.getUTCMonth() + 1),
		padDatePart(date.getUTCDate()),
	].join(".");
