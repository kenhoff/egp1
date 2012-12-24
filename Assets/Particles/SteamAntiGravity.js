#pragma strict

function Start () {

}

function FixedUpdate () {
	rigidbody.AddForce(Vector3.up * 9.81);
}