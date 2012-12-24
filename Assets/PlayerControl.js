#pragma strict

private var horizontal_speed = 10;
private var	max_horizontal_speed = 5;
private var jump_upward_velocity = 4;
private var min_jump_velocity = 3;

private var terrain_raycast_mask = (1<<9);
private var beam_raycast_mask = (1<<11);

public var HeatRayObject : GameObject;
public var FreezeRayObject : GameObject;

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

    if (Input.GetButton("Jump") && Physics.Raycast (transform.position, -Vector3.up, 1.1, terrain_raycast_mask)) {
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


	// beams

	if (Input.GetButton("Fire1")) {
		var pos = Input.mousePosition;
		var center = Vector3(Screen.width/2, Screen.height/2, 0);
		var dir = pos - center;
		dir.x = -dir.x;
		// Debug.Log(dir);
		// Debug.DrawRay(transform.position, dir);

		var hit : RaycastHit;
		Physics.Raycast(transform.position, dir, hit);
		var end_beam_location = transform.position + (dir.normalized * hit.distance);
		Debug.DrawLine(transform.position, end_beam_location);


		var angle_of_mousecursor = Mathf.Rad2Deg * Mathf.Atan2( (Input.mousePosition.y - Screen.width/2) , (Input.mousePosition.x - Screen.height/2));
		Debug.Log(angle_of_mousecursor);


		// var capsule_hit : RaycastHit;
		// if  (Physics.CapsuleCast (transform.position, end_beam_location, 1, Vector3.zero, capsule_hit)) {
		// 	Debug.Log("hit!");
		// 	Debug.Log(capsule_hit.collider);
		// }
		if (!HeatRayObject.activeSelf) {
			HeatRayObject.SetActive(true);
		}
		HeatRayObject.transform.position = transform.position;
		HeatRayObject.transform.localScale = Vector3(1, hit.distance, 1);
		HeatRayObject.transform.eulerAngles = Vector3(0, 0, -angle_of_mousecursor + 85);
		HeatRayObject.transform.position = transform.position + ((end_beam_location- transform.position) / 2);

	}
	else {
		HeatRayObject.SetActive(false);
		FreezeRayObject.SetActive(false);
	}

}

function DrawPlayerBeam () {

}