#pragma strict

private var horizontal_speed = 10;
private var	max_horizontal_speed = 5;
private var jump_upward_velocity = 4;
private var min_jump_velocity = 3;

private var terrain_raycast_mask = (1<<9);
private var beam_raycast_mask = (1<<11);
private var everything_but_particles_mask = ~(1<<8);

public var SteamPrefab : Transform;
public var WaterPrefab : Transform;
public var IcePrefab : Transform;
public var particle_root : Transform;

public var BeamObject : GameObject;

private var heat_ray : System.Boolean;

function Start () {
	heat_ray = true;
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

		// sort out position vectors

		var pos = Input.mousePosition;
		var center = Vector3(Screen.width/2, Screen.height/2, 0);
		var dir = pos - center;
		dir.x = -dir.x;
		var hit : RaycastHit;
		Physics.Raycast(transform.position, dir, hit, Mathf.Infinity, everything_but_particles_mask);
		var end_beam_location = transform.position + (dir.normalized * hit.distance);
		Debug.DrawLine(transform.position, end_beam_location);

		// change particles

		if (Physics.Linecast(transform.position, end_beam_location, hit, ~terrain_raycast_mask)) {
			// Debug.Log(hit.collider);
			if (heat_ray) {
				if (hit.collider.gameObject.tag == "Water") {
					var location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					var clone = Instantiate (SteamPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
				}
				if (hit.collider.gameObject.tag == "Ice") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (WaterPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
				}
			}
			else {
				if (hit.collider.gameObject.tag == "Steam") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (WaterPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
				}
				if (hit.collider.gameObject.tag == "Water") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (IcePrefab, location, Quaternion.identity);
					clone.parent = particle_root;
				}
			}
		}

		if (BeamObject.activeSelf == false) {
			BeamObject.SetActive(true);
		}

		BeamObject.transform.position = transform.position;
		BeamObject.GetComponent(LineRenderer).SetPosition(0, transform.position);
		BeamObject.GetComponent(LineRenderer).SetPosition(1, end_beam_location);
		if (heat_ray) {
			BeamObject.GetComponent(LineRenderer).SetColors(Color.red, Color.red);
		}
		else {
			BeamObject.GetComponent(LineRenderer).SetColors(Color.blue, Color.blue);
		}

	}
	else {
		// set beam renderer to inactive
		BeamObject.SetActive(false);
	}

	if (Input.GetButton("Fire2")) {
		if (heat_ray) {
			heat_ray = false;
		}
		else {
			heat_ray = true;
		}
	}

	// Debug.Log(heat_ray);

}

function DrawPlayerBeam () {

}