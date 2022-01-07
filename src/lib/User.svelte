<script lang="ts">
    import {user} from "../stores/smartonfhirstore";
</script>

{#if $user && $user.name.length > 0}
<p>    
    Current user: {$user.name[0].given} {$user.name[0].family}
</p>
{/if}