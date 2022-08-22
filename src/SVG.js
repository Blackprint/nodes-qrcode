/** 
 * Create QRCode from text data
 * @blackprint node
 */
Blackprint.registerNode("QRCode/SVG",
class InstanceNode extends Blackprint.Node {
	static input = {
		/** Text data that will be converted to QRCode */
		Data: Blackprint.Port.Union([String, Number]),
		/** QRCode's background color */
		BgColor: Blackprint.Port.Default(String, '#fff'),
		/** QRCode's dot color */
		DotColor: Blackprint.Port.Default(String, '#000'),
		/**
		 * QRCode's correction level (H, M, L)
		 * Default to High correction level (H)
		 * @menu
		 * - H = High (high correction level)
		 * - M = Medium (medium correction level)
		 * - L = Low (low correction level)
		 */
		CorrectLevel: Blackprint.Port.Default(String, 'H'),
	};

	static output = {
		/** SVG text in XML format */
		SVGText: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "QRCode SVG";
	}

	init(){
		let { Input, IInput } = this.ref;
		let optionChange = () => {
			this._qrcode = new QRCode({
				width: '100%',
				height: '100%',
				colorDark: Input.DotColor,
				colorLight: Input.BgColor,
				correctLevel: Input.CorrectLevel || 'H',
			});

			this.update();
			this.routes.routeOut();
		};

		optionChange();
		IInput.BgColor.on("value", Context.EventSlot, optionChange);
		IInput.DotColor.on("value", Context.EventSlot, optionChange);
	}

	update(){
		if(this._qrcode == null) return;

		let { Input, Output } = this.ref;
		Output.SVGText = this._qrcode.makeSVG(Input.Data ?? '');
	}
});