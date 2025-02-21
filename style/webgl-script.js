const canvas = document.getElementById("fluidCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.error("WebGL non supporté !");
}

// Ajuste la taille du canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Shaders GLSL (Vertex + Fragment)
const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform float time;
  uniform vec2 resolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float color = 0.5 + 0.5 * sin(time + uv.xyx * 10.0);
    gl_FragColor = vec4(vec3(color), 1.0);
  }
`;

// Création des shaders
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Erreur de compilation du shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Création du programme WebGL
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error("Erreur de liaison du programme:", gl.getProgramInfoLog(program));
}

// Création d'un carré couvrant tout l'écran
const vertices = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
   1,  1,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

// Uniformes pour le temps et la résolution
const timeUniformLocation = gl.getUniformLocation(program, "time");
const resolutionUniformLocation = gl.getUniformLocation(program, "resolution");

function render(time) {
  gl.uniform1f(timeUniformLocation, time * 0.001);
  gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(render);
}

// Lancer l'animation
requestAnimationFrame(render);
