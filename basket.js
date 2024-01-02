var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')

var width = canvas.width;
var height = canvas.height;

var center_x = canvas.width / 2;
var center_y = canvas.height / 2;

var largest_diam = canvas.width;
var smallest_diam = 20;
var circle_spacing = 15;

// drawCircles(center_x, center_y, width, circle_spacing, pixel_per_unit, num_circles);

function drawCircles(center_x, center_y, largest_diam, circle_spacing, pixel_per_unit, num_circles) {
    rad_decrement = circle_spacing * pixel_per_unit;

    for (i = largest_diam / 2, n = 0; n < num_circles / 2; i = i - rad_decrement, n += 1) {
        ctx.beginPath();
        ctx.arc(center_x, center_y, i, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#DFD7C8';
        ctx.fill()
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
}

function drawLines(angle, large_radius, small_radius) {
    for (i = 0; i < 360; i += angle) {
        drawLine('red', 2, i, large_radius, small_radius);
    }
}

function drawLine(color, width, angle, large_radius, small_radius) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    var x1 = large_radius + small_radius * Math.cos(-angle * Math.PI / 180)
    var y1 = large_radius + small_radius * Math.sin(-angle * Math.PI / 180)

    var x2 = large_radius + large_radius * Math.cos(-angle * Math.PI / 180)
    var y2 = large_radius + large_radius * Math.sin(-angle * Math.PI / 180)

    // console.log('line_x: %d', x);
    // console.log('line_y: %d', y);

    ctx.beginPath();
    // ctx.moveTo(center_x, center_y)
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    // ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawAll() {

    // clear up any left over lines and circles
    ctx.clearRect(0, 0, width, height);

    var unit = ""
    var selectedUnit = document.querySelector('input[name="unit"]:checked');
    if (selectedUnit != null) {
        unit = selectedUnit.value
    }

    var max_diam = document.getElementById('max_diam').value;
    var min_diam = document.getElementById('min_diam').value;
    var circle_spacing = document.getElementById('spacing').value;
    var line_angle = document.getElementById('angle').value;


    // need to map diameters to pixels
    pixel_per_unit = width / max_diam;
    num_circles = (max_diam - min_diam) / circle_spacing;

    drawCircles(center_x, center_y, width, Number(circle_spacing), pixel_per_unit, num_circles);

    smallest_radius = (Number(min_diam) + 0.5) * pixel_per_unit / 2;
    drawLines(Number(line_angle), largest_diam / 2, smallest_radius);
}

