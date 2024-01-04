
// Basket constructor
function Basket(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.center_x = canvas.width / 2;
    this.center_y = canvas.height / 2;

    this.largest_diam = canvas.width;
    this.smallest_diam = 20;
    this.circle_spacing = 15;
}

// Clear the canvas
Basket.prototype.clearAll = function () {
    // clear up any left over lines and circles
    this.ctx.clearRect(0, 0, this.width, this.height);
}

// Draw the radial lines
Basket.prototype.drawLines = function () {
    for (i = 0; i < 360; i += this.line_angle) {
        drawLine(this.ctx, 'red', 2, i, this.largest_diam / 2, this.smallest_radius);
    }
}

Basket.prototype.drawCircles = function () {
    rad_decrement = this.circle_spacing * this.pixel_per_unit;

    for (i = this.largest_diam / 2, n = 0; n < this.num_circles / 2; i = i - rad_decrement, n += 1) {
        this.ctx.beginPath();
        this.ctx.arc(this.center_x, this.center_y, i, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = '#DFD7C8';
        this.ctx.fill()
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#003300';
        this.ctx.stroke();
    }
}
// Draw the radial lines
Basket.prototype.drawLines = function () {
    for (i = 0; i < 360; i += this.line_angle) {
        drawLine(this.ctx, 'red', 2, i, this.largest_diam / 2, this.smallest_radius);
    }
}

function drawLine(ctx, color, width, angle, large_radius, small_radius) {

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    var x1 = large_radius + small_radius * Math.cos(-angle * Math.PI / 180)
    var y1 = large_radius + small_radius * Math.sin(-angle * Math.PI / 180)

    var x2 = large_radius + large_radius * Math.cos(-angle * Math.PI / 180)
    var y2 = large_radius + large_radius * Math.sin(-angle * Math.PI / 180)

    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawAll() {

    var basket = new Basket(document.getElementById('myCanvas'));

    basket.clearAll();

    var unit = ""
    var selectedUnit = document.querySelector('input[name="unit"]:checked');
    if (selectedUnit != null) {
        unit = selectedUnit.value
    }

    basket.max_diam = Number(document.getElementById('max_diam').value);
    basket.min_diam = Number(document.getElementById('min_diam').value);

    basket.circle_spacing = Number(document.getElementById('spacing').value);
    basket.line_angle = Number(document.getElementById('angle').value);

    // map diameters to pixels

    basket.pixel_per_unit = basket.width / basket.max_diam;
    basket.num_circles = (basket.max_diam - basket.min_diam) / basket.circle_spacing;

    basket.smallest_radius = (basket.min_diam + 0.5) * basket.pixel_per_unit / 2;

    basket.drawCircles();
    basket.drawLines();

}

