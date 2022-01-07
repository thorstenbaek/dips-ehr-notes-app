<script lang="ts">
    import { fhirStore } from "../stores/smartonfhirstore";
    const { user } = fhirStore;
</script>

{#if $user && $user.name.length > 0}
<p>    
    Current user: {$user.name[0].given} {$user.name[0].family}
</p>
{/if}