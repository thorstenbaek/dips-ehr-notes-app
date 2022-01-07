<script>
	import { fhirStore } from '../stores/smartonfhirstore';
    const {error, busy} = fhirStore;
</script>

{#if $error}
    <div>
        <b>{$error.name}</b>
        <p>{$error.message}</p>
        <p>{$error.stack}</p>
    </div>
{:else if $busy}
    <div>
        {$busy}...
    </div>
{/if}


