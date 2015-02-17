// Kristian Brown 2/17/15 Lab 2
var gl;
var verticesBuffer;
var translateTo;
var translation = [0,0];
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    	
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    gl.program = program;
	var i = draw(gl)
	
	translateTo = gl.getUniformLocation( gl.program, "translate");
	//Listen for key press
	document.onkeydown = function(k){
			switch(String.fromCharCode(k.keyCode)){
				case "1":	//center
					translation = [0,0];
				break;
				case "A":	//move left
					translation[0] = translation[0] - 0.2;
				break;
				case "S":	//move down
					translation[1] = translation[1] - 0.2;
				break;
				case "D":	//move right
					translation[0] = translation[0] + 0.2;
				break;
				case "W":	//move up
					translation[1] = translation[1] + 0.2;
				break;
			}
		render(i);
	}	
	gl.clearColor( 0.0, 0.5, 0.7, 1.0 );		//set background color
	render(i);
};


function render(i) {
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform2fv(translateTo, translation);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, i );
}


function draw(gl){
	var i = 5;	//num of vertices
	verticesBuffer = gl.createBuffer();
	//vertices for my pentagon, followed by the color of each vertex i.e. x,y,R,G,B
	var vertices = new Float32Array([
		-0.5, 0.25, 0, 0.5, 0.5,
		0, 0.50, 0.5, 0.0, 0.5,
		 0.5, 0.25, 0, 0.5, 0.5,
		 0.25, -0.25, 0.5, 0.0, 0.5,
		 -0.25, -0.25, 0.5, 0.0, 0.5 ]);
	gl.bindBuffer( gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var size = vertices.BYTES_PER_ELEMENT;

	var col = gl.getAttribLocation( gl.program, "color");
	gl.vertexAttribPointer(col, 3, gl.FLOAT, false, size*5, size*2);
	gl.enableVertexAttribArray(col);

	var pos = gl.getAttribLocation( gl.program, "position");
	gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, size*5, 0);
	gl.enableVertexAttribArray(pos);
	
	
	return i;
}


