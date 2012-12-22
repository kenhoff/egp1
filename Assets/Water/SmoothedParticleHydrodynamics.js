#pragma strict

private var smoothing_radius = 1.5;
private var repulsive_force = 50;
private var water_mask = (1<<8);

function Start () {

}

function Update () {
	// Debug.Log(water_mask);
	var nearby_particles = Physics.OverlapSphere(transform.position, smoothing_radius, water_mask);
	// Debug.Log(nearby_particles);
	for (var i = 0; i < nearby_particles.length; i++) {
		//var dist = Vector3.Distance(transform.position, nearby_particles[i].transform.position);
		//Debug.Log(dist);
		nearby_particles[i].rigidbody.AddForce(((nearby_particles[i].transform.position - transform.position)) * repulsive_force);
		Debug.Log(nearby_particles);
	}
}