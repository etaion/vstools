VSTOOLS.Text = {

	convert: function( i, len, end ) {

		len = len || i.length;

		var s = '';
		var j = 0;

		while ( j < len ) {

			if ( i[j] === 0xFA ) { // control code 0xFA

				if ( i[j + 1] === 0x06 ) { // space

					s += ' ';
					j += 2;

				} else { // TODO unknown

					// s += '{0xfa' + hex(i[j + 1]) + '}';
					j += 2;

				}
			} else if ( i[j] === 0xF8 ) { // control code 0xF8

				// unknown, skip
				j += 2;

			} else if ( i[j] === 0xFC ) { // control code 0xFC

				// unknown, skip
				j += 2;

			} else if (i[j] === 0xFB) { // control code 0xFB

				// unknown, skip
				j += 2;

			} else if ( i[j] === 0xE7 && end ) { // end of string

				return s;

			} else {

				s += VSTOOLS.Text.chr( i[j] );
				++j;

			}

		}

		return s;

	},

	chr: function( i ) {

		var c = VSTOOLS.Text.map[ i ];

		if ( c ) {

			return c;

		} else {

			return '{' + VSTOOLS.hex( i, 2 ) + '}';

		}

	}

};

(function() {

	var map = VSTOOLS.Text.map = new Array( 0xE9 );
	var i;

	// 0 - 9
	for ( i = 0; i <= 0x09; ++i ) {

		put( i, String.fromCharCode( i + 0x30 ) );

	}
	// A - Z
	for ( i = 0x0A; i <= 0x23; ++i ) {

		put( i, String.fromCharCode( i + 0x41 - 0x0A ) );

	}
	// a - z
	for ( i = 0x24; i <= 0x3D; ++i ) {

		put( i, String.fromCharCode( i + 0x61 - 0x24 ) );

	}

	put( 0x40, '_' );
	put( 0x41, '�' );
	put( 0x42, '�' );
	put( 0x43, '�' );
	put( 0x44, '�' );
	put( 0x45, '�' );
	put( 0x46, '�' );
	put( 0x47, '�' );
	put( 0x48, '�' );
	put( 0x49, '_' );
	put( 0x4A, '�' );
	put( 0x4B, '_' );
	put( 0x4C, '�' );
	put( 0x4D, '�' );
	put( 0x4E, '�' );
	put( 0x4F, '�' );
	put( 0x50, '�' );
	put( 0x51, '�' );
	put( 0x52, '�' );
	put( 0x53, '�' );
	put( 0x54, '�' );
	put( 0x55, '�' );
	put( 0x56, '�' );
	put( 0x57, '�' );
	put( 0x58, '�' );
	put( 0x59, '�' );
	put( 0x5A, '�' );
	put( 0x5B, '�' );
	put( 0x5C, '�' );
	put( 0x5D, '�' );
	put( 0x5E, '�' );
	put( 0x5F, '�' );
	put( 0x60, '�' );
	put( 0x61, '�' );
	put( 0x62, '�' );
	put( 0x63, '�' );
	put( 0x64, '�' );
	put( 0x65, '�' );
	put( 0x66, '�' );
	put( 0x67, '�' );
	put( 0x68, '�' );
	put( 0x69, '�' );
	put( 0x6A, '�' );

	put(0x8f, ' ');

	// long dash
	put( 0x8d, '--' );

	put( 0x90, '!' );
	put( 0x91, "'" );

	put( 0x94, '%' );

	put( 0x96, '\'' );
	put( 0x97, '( ' );
	put( 0x98, ' )' );

	put( 0x9B, '[' );
	put( 0x9C, ']' );
	put( 0x9D, ';' );
	put( 0x9E, ':' );
	put( 0x9F, ',' );
	put( 0xA0, '.' );
	put( 0xA1, '/' );
	put( 0xA2, '\\' );
	put( 0xA3, '<' );
	put( 0xA4, '>' );
	put( 0xA5, '?' );

	put( 0xA7, '-' );
	put( 0xA8, '+' );

	put( 0xB6, 'Lv.' ); // TODO what's this?

	put( 0xE8, '\n' );

	function put( i, c ) {

		map[i] = c;

	}

})();
