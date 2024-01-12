// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
enum fontSize {
	'thin' = 100,
	'extraLight' = 200,
	'light' = 300,
	'normal' = 400,
	'medium' = 500,
	'semiBold' = 600,
	'bold' = 700,
	'extraBold' = 800,
	'black' = 900,
	'extraBlack' = 950,
}

type ThemeConfig = {
	colors: { [colorName: string]: string };
	fonts: { [fontName: string]: string };
};

type PotBuild = {
	plant: string;
};
