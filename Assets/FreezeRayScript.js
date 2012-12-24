#pragma strict

public var WaterPrefab : Transform;


function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	// Debug.Log(collision.gameObject.tag);

	// turn steam into water
	if (collision.gameObject.tag == "Steam") {
		var location = collision.gameObject.transform.position;
		Destroy(collision.gameObject);
		Instantiate (WaterPrefab, location, Quaternion.identity);
	}
}