Blackprint.registerNode("QRCode/SVG",
class InstanceNode extends Blackprint.Node {
	static output = { SVGText: String };

	static input = {
		Data: Blackprint.Port.Union([String, Number]),
		BgColor: Blackprint.Port.Default(String, '#fff'),
		DotColor: Blackprint.Port.Default(String, '#000'),
		CorrectLevel: Blackprint.Port.Default(String, 'H'),
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
				correctLevel: Input.CorrectLevel,
			});

			this.update();
		};

		optionChange();
		IInput.BgColor.on("value", Context.EventSlot, optionChange);
		IInput.DotColor.on("value", Context.EventSlot, optionChange);
	}

	update(){
		if(this._qrcode == null) return;

		let { Input, Output } = this.ref;
		Output.SVGText = this._qrcode.makeSVG(Input.Data);
	}
});