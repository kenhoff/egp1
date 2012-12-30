#pragma strict

private var horizontal_speed = 10;
private var	max_horizontal_speed = 5;
private var jump_upward_velocity = 10;
private var min_jump_velocity = 3;

private var terrain_raycast_mask = (1<<9);
private var ice_raycast_mask = (1<<12);

private var time_between_jumps : float = 0.5;
private var time_since_jump : float;



function Start () {
}

function Update () {
	time_since_jump += Time.deltaTime;

	if (Input.GetKey(KeyCode.R)) {
		Application.LoadLevel(Application.loadedLevel);
	}
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

	var jump_raycast_dist = 1.2;
	var jump_raycast_width = .4;
	var on_ground : System.Boolean = Physics.Raycast (transform.position, -Vector3.up, jump_raycast_dist, terrain_raycast_mask + ice_raycast_mask) || Physics.Raycast (transform.position + (Vector3.right * jump_raycast_width), -Vector3.up, jump_raycast_dist, terrain_raycast_mask + ice_raycast_mask) || Physics.Raycast (transform.position + (-Vector3.right * jump_raycast_width), -Vector3.up, jump_raycast_dist, terrain_raycast_mask + ice_raycast_mask);

    if (Input.GetButton("Jump") && on_ground && (time_since_jump >= time_between_jumps)) {
		rigidbody.velocity = rigidbody.velocity + (Vector3.up * jump_upward_velocity);
		time_since_jump = 0;
		
	}

	Debug.DrawRay(transform.position, -Vector3.up * jump_raycast_dist);
	Debug.DrawRay(transform.position + (Vector3.right * jump_raycast_width), -Vector3.up * jump_raycast_dist);
	Debug.DrawRay(transform.position + (-Vector3.right * jump_raycast_width), -Vector3.up * jump_raycast_dist);

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
