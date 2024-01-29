export const shortenDescription = (inputString: string, maxLength: number = 150): string => {
	if (inputString.length > maxLength) {
		const truncatedString = inputString.substr(0, maxLength);
		const lastSpaceIndex = truncatedString.lastIndexOf(' ');

		if (lastSpaceIndex !== -1) {
			return truncatedString.substr(0, lastSpaceIndex) + '...';
		} else {
			return truncatedString + '...';
		}
	} else {
		return inputString;
	}
};
