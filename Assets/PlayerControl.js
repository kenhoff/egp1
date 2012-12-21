#pragma strict

public var horizontal_force = 1;

function Start () {

}

function Update () {

}

function FixedUpdate () {

	// move left and right
	var horizontal_input = Input.GetAxis("Horizontal") * horizontal_force;
	var force = -Vector3.right * horizontal_input;
	rigidbody.AddForce(force);

	Debug.Log(Input.mousePosition);

}