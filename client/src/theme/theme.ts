const color = {
	withe: "",
	violet:"#6C63FF",
	placeholder: "#adb5bd",
	hovergray: "",
	green: "",
	apricot: "",
	lightgray: "",
};

const line = {
	gray: "",
};

const size = {
    mobileS: "",
    mobileL: "",
	laptopS: "",
	tabletS: "",
	laptopXs: "",
	tablet: "",
	laptop: "",
	desktop: "",
	desktopL: "",
};

export const theme = {
	color,
	line,
	mobileS: `(max-width: ${size.mobileS})`,
	laptopXs: `(max-width: ${size.laptopXs})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopS: `(max-width: ${size.laptopS})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
};