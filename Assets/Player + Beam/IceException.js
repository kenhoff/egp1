#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collisionInfo : Collision) {
	if (collisionInfo.gameObject.tag == "Ice") {
		rigidbody.active = false;
	}
}