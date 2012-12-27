#pragma strict

public var time_to_cool : float;

function Start () {

}

function Update () {
	if (time_to_cool < 0) {
		time_to_cool = 0;
	}
	else if (time_to_cool > 0) {
		time_to_cool -= Time.deltaTime;
	}
}