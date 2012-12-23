#pragma strict

public var radius : float = 1;
public var repulsion : float = 100;
private var water_mask = (1<<8);
private var expand_rate = 1;
private var contract_rate = expand_rate * 4;
private var base_radius = radius;

function Start () {

}

function FixedUpdate () {
	var nearby_particles = Physics.OverlapSphere(transform.position, radius, water_mask);
	var particle_count = nearby_particles.length;
	for (var i = 0; i < particle_count; i++) {
		var force_direction = nearby_particles[i].transform.position - transform.position;
		nearby_particles[i].rigidbody.AddForce(force_direction * repulsion * particle_count);
		//Debug.DrawRay(transform.position, force_direction * 2, Color.green, particle_count);
	}

}

function OnDrawGizmosSelected() {
	Gizmos.DrawWireSphere(transform.position, radius);
}