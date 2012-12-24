#pragma strict

public var radius : float = 1;
public var repulsion : float = 100;
private var particle_mask = (1<<8);
private var terrain_mask = (1<<9);
private var expand_rate = 1;
private var contract_rate = expand_rate * 4;
private var base_radius = radius;
private var terrain_mult = 3;

function Start () {

}

function FixedUpdate () {

	// particle pressure
	var nearby_particles = Physics.OverlapSphere(transform.position, radius, particle_mask);
	var particle_count = nearby_particles.length;
	for (var i = 0; i < particle_count; i++) {
		var particle_force_direction = nearby_particles[i].transform.position - transform.position;
		nearby_particles[i].rigidbody.AddForce(particle_force_direction * repulsion * particle_count);
		//Debug.DrawRay(transform.position, particle_force_direction * 2, Color.green, particle_count);
	}

	// // terrain pressure
	// var nearby_terrain = Physics.OverlapSphere(transform.position, radius, terrain_mask);
	// var terrain_count = nearby_terrain.length;
	// for (var j = 0; j < terrain_count; j++) {
	// 	var terrain_force_direction = transform.position - nearby_terrain[j].ClosestPointOnBounds(transform.position);
	// 	rigidbody.AddForce(terrain_force_direction * repulsion * terrain_count * terrain_mult);
	// 	Debug.DrawRay(transform.position, terrain_force_direction * 2, Color.green);
	// }
}

function OnDrawGizmosSelected() {
	Gizmos.DrawWireSphere(transform.position, radius);
}