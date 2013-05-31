#pragma strict

public var gun : ParticleSystem;
public var damage : float = 0.05;
public var mask : LayerMask;

function FixedUpdate () {

	if(Input.GetButton("Fire1")) {
		gun.Play();
		
		var hit : RaycastHit;
		var jitter : Vector3 = gun.transform.right * (Random.value - 0.5) + gun.transform.up * (Random.value - 0.5);
		var direction : Vector3 = gun.transform.forward + jitter * 0.6;
		var distance : float = 6;
        if (Physics.Raycast(gun.transform.position, direction, hit, distance, mask)) {
        	Debug.DrawRay(gun.transform.position, direction * distance, Color.red, 0.1); 
        	hit.collider.transform.localScale.y *= (1 - damage);
    	    hit.collider.renderer.material.color = Color.black;
            if(hit.collider.transform.localScale.y < 0.25) {
	        	Destroy(hit.transform.gameObject);
            }
        }
        
	} else {
		gun.Stop();
	}

	if(gameObject.transform.localScale.y < 1) {
		var health : float = gameObject.transform.localScale.y * 0.99 + 0.01;
		var heal : float = health - gameObject.transform.localScale.y;
		gameObject.transform.position.y += heal;
		gameObject.transform.localScale.y = health;
	}
}