#pragma strict

private var horizontal_speed = 4;
private var	max_horizontal_speed = 5;
private var jump_upward_velocity = 4;
private var min_jump_velocity = 3;

private var terrain_raycast = (1<<9);

public var HeatRayPrefab : Transform;
public var FreezeRayPrefab : Transform;

function Start () {

}

function Update () {

}

function FixedUpdate () {

	// move left and right

	var horizontal_input = Input.GetAxis("Horizontal") * horizontal_speed;
	var speed = -Vector3.right * horizontal_input;
	rigidbody.velocity += speed;

	// curb velocity

	if (rigidbody.velocity.x > max_horizontal_speed) {
		rigidbody.velocity.x = max_horizontal_speed;
	}
	if (rigidbody.velocity.x < -max_horizontal_speed) {
		rigidbody.velocity.x = -max_horizontal_speed;
	}



	// jump mechanics

	// jump from ground

    if (Input.GetButton("Jump") && Physics.Raycast (transform.position, -Vector3.up, 1.1, terrain_raycast)) {
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
	if (Input.GetButton("Fire1")) {
		var pos = Input.mousePosition;
		var center = Vector3(Screen.width/2, Screen.height/2, 0);
		var dir = pos - center;
		dir.x = -dir.x;
		// Debug.Log(dir);
		// Debug.DrawRay(transform.position, dir);

		var hit : RaycastHit;
		Physics.Raycast(transform.position, dir, hit);
		Debug.DrawRay(transform.position, dir.normalized * hit.distance);
		// var beam = Instantiate(HeatRayPrefab)
	}

}