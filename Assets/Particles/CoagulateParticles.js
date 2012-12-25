#pragma strict

private var coag_force = .25;

function Start () {

}

function Update () {
	var center = Vector3.zero;
	var particle_count = transform.GetChildCount();
	for (var i = 0; i < particle_count; i++) {
		var particle = transform.GetChild(i);
		if (particle.tag != "Ice") {
			center += particle.transform.position;
		}
	}
	center = center / particle_count;
	// Debug.Log(center);
	for (i = 0; i < particle_count; i++) {
		particle = transform.GetChild(i);
		if (particle.tag != "Ice") {
			particle.rigidbody.AddForce((center - particle.transform.position) * coag_force);
		}
	}
}