
/**
 * Gmaps api v3 rectangle overlay
 * @author Esa 2009
 */
var BOUNDS_BOX_VERSION = "0.1b";

function BoundsBox(map, bounds, opt_options) {
  this.bounds_ = bounds;
  this.setMap(map);
  this.opts = opt_options || {};
  if(this.opts.fit) map.fitBounds(bounds);
  this.map = map;
}

BoundsBox.prototype = new google.maps.OverlayView();

BoundsBox.prototype.onAdd = function() {
  var me = this;
  var div = this.div_;
  if (!div) {
    div = this.div_ = document.createElement('div');
    div.style.position = "absolute";
    div.className = this.opts.cssClass || 'bounds-box';
    div.innerHTML = this.opts.html || "";
    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(me, "click", event);
    });
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  }
}

BoundsBox.prototype.draw = function() {
  // Position and dimension the overlay
  var div = this.div_;
  var pixSW = this.getProjection().fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var pixNE = this.getProjection().fromLatLngToDivPixel(this.bounds_.getNorthEast());
  this.divSize = new google.maps.Size((pixNE.x-pixSW.x), (pixSW.y-pixNE.y));
  div.style.left = pixSW.x + 'px';
  div.style.top = pixNE.y + 'px';
  div.style.width = this.divSize.width + "px";
  div.style.height = this.divSize.height + "px";
}

BoundsBox.prototype.onRemove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
}

BoundsBox.prototype.getPosition = function() {
  return this.bounds_.getCenter();
}
BoundsBox.prototype.get_position = function() {      // deprecated
  return this.bounds_.getCenter();
}
BoundsBox.prototype.setClassName = function(cssClass) {
  this.div_.className = cssClass;
}
BoundsBox.prototype.getClassName = function() {
  return this.div_.className;
}
BoundsBox.prototype.setContent = function(html) {
  this.div_.innerHTML = html;
}
BoundsBox.prototype.getContent = function() {
  return this.div_.innerHTML;
}

BoundsBox.prototype.getDiv = function() {
  return this.div_;
}

BoundsBox.prototype.getSize = function() {
  return this.divSize;
}
