#pragma strict
private var input_size : int = 64;

function Start () {

}

function Update () {
	var input_texture = Texture2D (input_size, input_size);
	renderer.material.mainTexture = input_texture;

	for (var y = 0; y < input_size; y++) {
		for (var x = 0; x < input_size; x++) {
			input_texture.SetPixel(x, y, Color.black);
		}
	}

	for (var i = 0; i < transform.GetChildCount(); i++) {
		var particle = transform.GetChild(i);
		input_texture.SetPixel(Mathf.RoundToInt(particle.transform.position.x), Mathf.RoundToInt(particle.transform.position.y), Color.white);
	}


	var sigma = 4;
	var k = 6*sigma+1;
	var gauss_texture = Texture2D(k, k);

	for (var y1 = -3*sigma; y1 < 3*sigma+1; y1++) {
		for (var x1 = -3*sigma; x1 < 3*sigma+1; x1++) {
			input_texture.SetPixel(x1, y1, Color(Mathf.Exp(-(x1*x1+y1*y1)/(2*sigma*sigma)), 0, 0));
		}
	}


	input_texture.Apply();

}