<script lang="ts">
    import { fhirStore } from "../stores/smartonfhirstore";
    const { patient } = fhirStore;
</script>

{#if $patient && $patient.name.length > 0}
<p>    
    Current patient: {$patient.name[0].given} {$patient.name[0].family}
</p>
{/if}