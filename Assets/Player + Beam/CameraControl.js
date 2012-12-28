#pragma strict

public var Player : Transform;
private var size : float = 10;
public var zoom_rate = 5;

function Start () {

}

function Update () {
	transform.position = Player.transform.position + Vector3(0, 0, 1);
	//Debug.Log(Player.transform.position);

	var change = -Input.GetAxis("Mouse ScrollWheel") * zoom_rate;
	size += change;
	if (size < 1 ) size = 1; 
	camera.orthographicSize = size;

	// var ray : Ray = camera.ScreenPointToRay (Input.mousePosition);
	// // var hit : RaycastHit;
	// var target = Vector3(ray.origin.x, 0, 0);
	// Debug.Log(target);
 //    Debug.DrawRay (ray.origin, ray.direction * 10, Color.yellow);
 //    Player.LookAt(target);

}