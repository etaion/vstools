VSTOOLS.MPDGroup = function( reader, logger, mpd ) {

	reader.extend( this );
	logger.extend( this );

	this.read = function() {

		header();
		data();

	};

	this.header = function() {

		var u8 = this.u8;

		var head = this.head = [];

		for ( var i = 0; i < 64; ++i ) {

			head[ i ] = u8();

		}

		//log( hex( header, 2 ) );

		// the header is not well understood
		// it seems that the bits in the second byte are flag bits
		// the following fixes the scaling issues in maps 001 and 002
		if ( ( head[1] & 0x08 ) > 0 ) {

			scale = 1;

		} else {

			scale = 8; // TODO is this the default?

		}

	};

	this.data = function() {

		var u32 = this.u32;

		this.numPoly3gts = u32();
		this.numPoly4gts = u32();
		this.numPoly = numPoly3gts + numPoly4gts;

		log( 'numPoly: ' + numPoly );

		var polygons = this.polygons = [];
		var meshes = this.meshes = {};

		for ( var i = 0; i < numPoly3gts; ++i ) {

			polygons[i] = new VSTOOLS.MPDPolygon( this, data );
			polygons[i].read( false );

			var mesh = this.getMesh( polygons[i].textureId, polygons[i].clutId );
			mesh.add( polygons[i] );

		}

		for ( var i = numPoly3gts; i < numPoly; ++i ) {

			polygons[i] = new VSTOOLS.MPDPolygon( this.reader, this.logger );
			polygons[i].read( true );

			var mesh = this.getMesh( polygons[i].textureId, polygons[i].clutId );
			mesh.add( polygons[i] );

		}

	};

	this.build = function() {

		for ( var id in this.meshes ) {

			this.mesh[ id ].build();

		}

	};

	this.getMesh = function( textureId, clutId ) {

		var meshes = this.meshes;
		var id = textureId + '-' + clutId;

		var mesh = meshes[ id ];

		if ( mesh ) {

			return mesh;

		} else {

			mesh = new MPDMesh( this.reader, this.logger, this, textureId, clutId );
			meshes[ id ] = mesh;
			return mesh;

		}

	};

};
