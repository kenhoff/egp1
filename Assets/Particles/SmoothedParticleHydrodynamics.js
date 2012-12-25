#pragma strict

public var radius : float = 1;
public var repulsion : float = 100;
private var particle_mask = (1<<8);
private var terrain_mask = (1<<9);

function Start () {

}

function FixedUpdate () {

	
	
	// particle pressure
	var nearby_particles = Physics.OverlapSphere(transform.position, radius, particle_mask);
	var particle_count = nearby_particles.length;
	for (var i = 0; i < particle_count; i++) {
		if (nearby_particles[i].tag != "Ice") {
			var particle_force_direction = nearby_particles[i].transform.position - transform.position;
			nearby_particles[i].rigidbody.AddForce(particle_force_direction * repulsion * particle_count);
		}
	}

}

function OnDrawGizmosSelected() {
	Gizmos.DrawWireSphere(transform.position, radius);
}