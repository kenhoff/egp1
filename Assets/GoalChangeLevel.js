#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (object : Collider) {
	if (object.tag == "Player") {
		Application.LoadLevel(Application.loadedLevel + 1);
	}
}