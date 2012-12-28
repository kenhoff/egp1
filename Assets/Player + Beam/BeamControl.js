// #pragma strict

private var beam_raycast_mask = (1<<11);
private var everything_but_particles_mask = ~(1<<8);
private var terrain_raycast_mask = (1<<9);


public var SteamPrefab : Transform;
public var WaterPrefab : Transform;
public var IcePrefab : Transform;
public var particle_root : Transform;

public var BeamObject : GameObject;

private var heat_ray : System.Boolean;

private var particle_change_cooldown_time = 1;

function Start () {
	heat_ray = true;
}

function Update () {
	// beams

	if (Input.GetButton("Fire1")) {
		FireBeam(!heat_ray);
	
	}
	else if (Input.GetButton("Fire2")) {
		FireBeam(heat_ray);
	}
	else {
		// set beam renderer to inactive
		BeamObject.SetActive(false);
	}

	// Debug.Log(heat_ray);
}


function FireBeam (heat_ray) {
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
		// var cooldown_script = hit.collider.gameObject.GetComponent("ParticleChangeCooldown");
		// Debug.Log(hit.collider.gameObject.GetComponent("ParticleChangeCooldown").time_to_cool); 
		if (hit.collider.gameObject.GetComponent("ParticleChangeCooldown").time_to_cool == 0) {
			if (heat_ray) {
				if (hit.collider.gameObject.tag == "Water") {
					var location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					var clone = Instantiate (SteamPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
					clone.GetComponent("ParticleChangeCooldown").time_to_cool = particle_change_cooldown_time;
				}
				if (hit.collider.gameObject.tag == "Ice") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (WaterPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
					clone.GetComponent("ParticleChangeCooldown").time_to_cool = particle_change_cooldown_time;
				}
			}
			else {
				if (hit.collider.gameObject.tag == "Steam") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (WaterPrefab, location, Quaternion.identity);
					clone.parent = particle_root;
					clone.GetComponent("ParticleChangeCooldown").time_to_cool = particle_change_cooldown_time;
				}
				if (hit.collider.gameObject.tag == "Water") {
					location = hit.collider.gameObject.transform.position;
					Destroy(hit.collider.gameObject);
					clone = Instantiate (IcePrefab, location, Quaternion.identity);
					clone.parent = particle_root;
					clone.GetComponent("ParticleChangeCooldown").time_to_cool = particle_change_cooldown_time;
				}
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