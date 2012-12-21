#pragma strict

private var smoothing_radius = 2;

function Start () {

}

function Update () {
	var nearby_particles = Physics.OverlapSphere(transform.position, 1);
	// Debug.Log(nearby_particles);
	for (var i = 0; i < nearby_particles.length; i++) {
		var dist = Vector3.Distance(transform.position, nearby_particles[i].transform.position);
		nearby_particles[i].rigidbody.AddForce((nearby_particles[i].transform.position - transform.position) / dist);
		// Debug.Log(nearby_particles[i]);
	}
}