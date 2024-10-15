<script>
    import { page } from '$app/stores';  
</script>


<nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Listing App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    {#if $page.url.pathname==='/'}
                    <a class="nav-link active" href="/">Upload</a>
                    {:else}
                    <a class="nav-link" href="/">Upload</a>
                    {/if}
                </li>
                <li class="nav-item">
                    {#if $page.url.pathname==='/get'}
                        <a class="nav-link active" href="/get">List</a>
                    {:else}
                        <a class="nav-link" href="/get">List</a>
                    {/if}
                </li>
            </ul> 
        </div>
    </div>
</nav>
<slot />