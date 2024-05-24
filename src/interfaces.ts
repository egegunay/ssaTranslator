interface ssaFile {
	header: string;
	styles: ssaStyle[];
	events: ssaEvent[];
}

interface ssaStyle {
	name: string;
	fontname: string;
	fontsize: string;
	primaryColour: string;
	secondaryColour: string;
	outlineColour: string;
	backColour: string;
	bold: string;
	italic: string;
	underline: string;
	strikeout: string;
	scaleX: string;
	scaleY: string;
	spacing: string;
	angle: string;
	borderStyle: string;
	outline: string;
	shadow: string;
	alignment: string;
	marginL: string;
	marginR: string;
	marginV: string;
	encoding: string;
}

interface ssaEvent {
	layer: string;
	start: string;
	end: string;
	style: string;
	name: string;
	marginL: string;
	marginR: string;
	marginV: string;
	effect: string;
	text: string;
}
