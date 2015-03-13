VSTOOLS.SHP = function( reader, logger ) {

	VSTOOLS.WEP.call( this, reader, logger );

};

VSTOOLS.SHP.prototype = Object.create( VSTOOLS.WEP.prototype );

VSTOOLS.SHP.prototype.read = function() {

	this.header();
	this.data();

};

VSTOOLS.SHP.prototype.header = function() {

	var u8 = this.u8, s8 = this.s8, u16 = this.u16, s16 = this.s16, u32 = this.u32,
		skip = this.skip, hex = VSTOOLS.hex, log = this.log;

	log( 'SHP header' );

	this.header1(); // inherited from WEP

	this.overlayX = [];
	this.overlayY = [];
	this.width = [];
	this.height = [];

	for ( i = 0; i < 8; ++i ) {

		this.overlayX.push( u8() );
		this.overlayY.push( u8() );
		this.width.push( u8() );
		this.height.push( u8() );

	}

	skip( 0x24 ); // unknown

	skip( 0x6 ); // collision, not sure about this
	this.menuPositionY = s16();
	skip( 0xc ); // u
	this.shadowRadius = s16();
	this.shadowSizeIncrease = s16();
	this.shadowSizeDecrease = s16();
	skip( 4 );

	this.menuScale = s16();
	skip( 2 );
	this.targetSpherePositionY = s16();
	skip( 8 );

	this.animLBAs = [];
	for ( i = 0; i < 0xC; ++i) {

		this.animLBAs.push( u32() );

	}

	this.chainIds = [];
	for ( i = 0; i < 0xC; ++i) {

		this.chainIds.push( u16() );

	}

	this.specialLBAs = [];
	for ( i = 0; i < 4; ++i) {

		this.specialLBAs[i] = u32();

	}

	skip( 0x20 ); // unknown, more lbas?

	this.magicPtr = u32() + 0xF8;
	log("magicPtr: " + hex(this.magicPtr));

	skip(0x18 * 2);

	this.akaoPtr = u32() + 0xF8;
	log("akaoPtr: " + hex(this.akaoPtr));

	this.groupPtr = u32() + 0xF8;
	log("groupPtr: " + hex(this.groupPtr));

	this.vertexPtr = u32() + 0xF8;
	log("vertexPtr: " + hex(this.vertexPtr));

	this.polygonPtr = u32() + 0xF8;
	log("polygonPtr: " + hex(this.polygonPtr));

	// static, unused
	this.jointPtr = 0x138;
}

VSTOOLS.SHP.prototype.data = function() {

	var u16 = this.u16, u32 = this.u32, skip = this.skip, hex = VSTOOLS.hex, log = this.log;

	log("SHP data");

	// inherited
	this.jointSection();
	this.groupSection();
	this.vertexSection();
	this.polygonSection();

	// skip akao
	skip( this.magicPtr - this.akaoPtr );

	// skip magic section
	skip( 4 );
	var length = u32();
	log( "magicSectionLength: " + hex( length ) );
	skip( length );

	log( "textureMapPtr should be " + hex( length + this.magicPtr + 8 ) );

	// inherited
	this.textureSection(2); // 2 palettes

};

VSTOOLS.SHP.prototype.setSEQ = function( seq ) {

	this.activeSeq = seq;

	/*// remove current animations
	ArrayList<String> names = new ArrayList<String>(
			control.getAnimationNames());

	for (String name : names) {
		control.removeAnim(control.getAnim(name));
	}

	// set new animations
	for (int i = 0; i < seq.animations.length; ++i) {
		if (seq.animations[i].ok)
			control.addAnim(seq.animations[i].animation);
	}*/

};