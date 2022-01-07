import type { Writable, Readable } from 'svelte/store';
import { writable, derived } from "svelte/store";
import type Client from "fhirclient/lib/Client";
import type Resource from "fhirclient/lib/types";
import {oauth2 as SMART} from 'fhirclient';

class Context {    
    client: Client;
    error: string;

    constructor(client: Client, error: string) {
        this.client = client;
        this.error = error;
    }
}

export const fhir: Writable<Context> = writable(null);

export const user: Readable<Resource> = derived(
    fhir, 
    ($fhir, set) => {        
        if ($fhir != null && $fhir.client != null) {                    
            $fhir.client.user.read().then(u => set(u));
        }
   });

SMART?.ready()
    .then(client => {
        console.log("Ready:", client);
        var newContext = new Context(client, "");
        fhir.set(newContext)})
    .catch(error => {
        var newContext = {
            client: null,
            error: error
        };
        fhir.set(newContext)});
