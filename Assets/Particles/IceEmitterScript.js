#pragma strict

public var particles : int;
private var particles_left : int;
public var ice_prefab : Transform;
public var particles_per_second : float;
private var accum_time : float;
public var particles_root : Transform;
public var radius = 5; 

function Start () {
	particles_left = particles;
}

function Update () {
	if ((accum_time > 1/particles_per_second) && (particles_left > 0)) {
			var clone = Instantiate (ice_prefab, transform.position + Vector3(Random.value* radius, Random.value * radius, 0), Quaternion.identity);
			clone.parent = particles_root;
			particles_left -= 1;
			accum_time = 0;
	}
	accum_time += Time.deltaTime;
}