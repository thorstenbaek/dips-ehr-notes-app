<script>
	import {oauth2 as Smart} from 'fhirclient';
	import {onMount} from 'svelte';

	onMount(async () => {
		Smart.authorize({
			clientId: 'dips-ehr-notes-app',
			scope: 'launch launch/patient patient/DocumentReference.write patient/DocumentReference.read patient/Patient.read patient/encounter patient/resource online_access openid fhirUser profile',			
			redirectUri: './app',
			
			//iss:		 'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			//launch:		 'cdp2012466::DocumentReference/ako1006604'
			//launch:		 'cdp2012466::DocumentReference/ako1006682'

			iss: 'https://dev.dips.fhir.service.sandbox.dips.no',
			launch: '6c5d9ca9-54d7-42f5-bfae-a7c19cd217f2::DocumentReference/b3e32146-848c-4d3b-b8a9-c9b3a7861a6a'

		});
	});
</script>

