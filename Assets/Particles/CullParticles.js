#pragma strict

function Start () {

}

function Update () {
	if (transform.position.z != 0) {
		transform.position.z = 0;
	}

	if (rigidbody.velocity.magnitude > 5) {
		rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
	}
	else {
		rigidbody.collisionDetectionMode = CollisionDetectionMode.Discrete;
	}
}