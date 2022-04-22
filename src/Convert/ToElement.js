Blackprint.registerNode("QRCode/Convert/ToElement",
class extends Blackprint.Node {
	static input = { String };
	static output = {
		Element: window.SVGElement,
		DivElement: window.HTMLDivElement,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/QRCode/Convert/ToElement');
		iface.title = "To Element";
	}

	imported(){
		let { Output } = this.ref;
		this.iface._element = Output.DivElement = document.createElement('div');
	}

	update(){
		let { Input, Output } = this.ref;

		Output.DivElement.innerHTML = Input.String;
		Output.Element = Output.DivElement.firstElementChild;
	}
});

Blackprint.registerInterface('BPIC/QRCode/Convert/ToElement',
Context.IFace.ToElement = class extends Blackprint.Interface { });