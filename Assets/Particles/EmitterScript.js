#pragma strict

public var particles : int;
private var particles_left : int;
public var prefab : Transform;
public var rate : float;
private var accum_time : float;
public var particles_root : Transform;

function Start () {
	particles_left = particles;
}

function Update () {
	if ((accum_time > rate) && (particles_left > 0)) {
			var clone = Instantiate (prefab, transform.position + Vector3(Random.value, Random.value, 0), Quaternion.identity);
			clone.parent = particles_root;
			particles_left -= 1;
			accum_time = 0;
	}
	accum_time += Time.deltaTime;
	// Debug.Log(accum_time);
}