#pragma strict

private var horizontal_speed = 10;
private var	max_horizontal_speed = 5;
private var jump_upward_velocity = 4;
private var min_jump_velocity = 3;

private var terrain_raycast_mask = (1<<9);
private var ice_raycast_mask = (1<<12);



function Start () {
}

function Update () {

}

function FixedUpdate () {

	// move left and right

	var horizontal_input = Input.GetAxis("Horizontal") * horizontal_speed;
	var speed = -Vector3.right * horizontal_input;
	rigidbody.AddForce(speed);

	// curb velocity

	if (rigidbody.velocity.x > max_horizontal_speed) {
		rigidbody.velocity.x = max_horizontal_speed;
	}
	if (rigidbody.velocity.x < -max_horizontal_speed) {
		rigidbody.velocity.x = -max_horizontal_speed;
	}



	// jump mechanics

	// jump from ground

    if (Input.GetButton("Jump") && Physics.Raycast (transform.position, -Vector3.up, 1.2, terrain_raycast_mask + ice_raycast_mask)) {
		rigidbody.velocity = rigidbody.velocity + (Vector3.up * jump_upward_velocity);
		Debug.DrawRay(transform.position, -Vector3.up * 1);
	}

	// release jump in air

	if (!Input.GetButton("Jump") && (rigidbody.velocity.y > 0)) {
		if (rigidbody.velocity.y > min_jump_velocity) {
			rigidbody.velocity = rigidbody.velocity + -(Vector3.up * min_jump_velocity);

		}
	}



	// player face mouse

	if (Input.mousePosition.x > (Screen.width / 2)) {
		transform.eulerAngles.y = 0;
	}
	else {
		transform.eulerAngles.y = 180;
	}

}
