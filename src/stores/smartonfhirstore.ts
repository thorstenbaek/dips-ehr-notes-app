import type { Writable, Readable } from 'svelte/store';
import { writable, derived } from "svelte/store";
import type Client from "fhirclient/lib/Client";
import type Practitioner from "fhirclient/lib/types";
import type Patient from "fhirclient/lib/types";
import {oauth2 as SMART} from 'fhirclient';

class FhirStore {
    client: Writable<Client>;
    user: Readable<Practitioner>;
    patient: Readable<Patient>;
    error: Writable<Error>;
    busy: Writable<string>;

    constructor() {
        this.client = writable(null);        
        this.error = writable(null);
        this.busy = writable(null);
        this.user = derived(this.client, 
            ($client, set) => {        
                if ($client) {      
                    this.busy.set("Loading user");
                    $client.user.read().then(
                        u => {
                            set(u);
                            this.busy.set(null);
                        });
                }
            });
        this.patient = derived(this.client,
            ($client, set) => {
                if ($client) {
                    this.busy.set("Loading patient");
                    $client.patient.read().then(
                        p => {
                            set(p)
                            this.busy.set(null);
                        });
                }
            });    
    }
}

export const fhirStore: FhirStore = new FhirStore();

fhirStore.busy.set("Loading SMART on FHIR context...");
SMART?.ready()
    .then(client => {
        console.log("Ready:", client);
        fhirStore.error.set(null);
        fhirStore.busy.set(null);
        fhirStore.client.set(client);
    })
    .catch(error => {
        fhirStore.client.set(null);
        fhirStore.busy.set(null);
        fhirStore.error.set(error);
    });
