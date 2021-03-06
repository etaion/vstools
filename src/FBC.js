VSTOOLS.FBC = function (reader) {
  reader.extend(this);
};

VSTOOLS.FBC.prototype.read = function () {
  var u16 = this.u16,
    s16 = this.s16,
    s16big = this.s16big;

  var palette = (this.palette = []);

  for (var i = 0; i < 256; ++i) {
    var c = this.color(u16());
    palette.push(c);
  }
};

VSTOOLS.FBC.prototype.color = function (c) {
  var a = (c & 0x8000) >> 15;
  var b = (c & 0x7c00) >> 10;
  var g = (c & 0x03e0) >> 5;
  var r = c & 0x001f;

  // 5bit -> 8bit is factor 2^3 = 8
  var f = 8;
  return [r * f, g * f, b * f, 255];
};
