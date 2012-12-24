#pragma strict

public var SteamPrefab : Transform;

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	// Debug.Log(collision.gameObject.tag);

	// turn steam into water
	if (collision.gameObject.tag == "Water") {
		var location = collision.gameObject.transform.position;
		Destroy(collision.gameObject);
		Instantiate (SteamPrefab, location, Quaternion.identity);
	}
}