<script lang="ts">
	import axios from 'axios';
    import {onMount} from 'svelte'

    type ItemType = {
    id:number,
    name:string,
    email:string,
    body:string
    }

    type ListType =  ItemType[]

    type FetchType = {
    list:ListType,
    totalPages:number
    }

    let list:ListType=[]
    let totalPages:number=0

    let searchKey = ""
    let currentPage = 1

    const fetchData = async () =>{

        const url=`http://localhost:9000/api/list/get?searchKey=${searchKey}&page=${currentPage}&pageSize=25`
        
        const response = await axios.get(url)

        list = response.data.list
        totalPages=response.data.totalPages

        
    }

    

    onMount(()=>{
        fetchData()  
    })

    

    const prev = () =>{
        // as long as the current page is not the first page, this handle will bring user to the previous page
        if (currentPage > 1) {
            currentPage = currentPage- 1;
        }
    }

    const next = () =>{
        // as long as the current page is 1 page before the total number of pages, this handle will bring user to the next page
        if (currentPage < totalPages) {
            currentPage=currentPage + 1;
        }
    }

    const searchHandle = (e: Event & { currentTarget: EventTarget & HTMLInputElement; })=>{
        const {value}= e.target as HTMLInputElement
        searchKey = value
        currentPage=1
    }


    $:  {
        searchKey
        fetchData()
        console.log(searchKey)
    }

    $:  {
        currentPage
        fetchData()
    }
    

</script>



<h1>List</h1>

<div style="width:50%; margin:auto; margin-top: 100px;">
    <div><h3>Page: {currentPage}</h3></div>

    <nav>
        <ul class="pagination">
            <li class="page-item">
                {#if currentPage > 1}
                    <button class="page-link" on:click={prev} >Previous</button>
                {:else}
                    <button class="page-link disabled" on:click={prev} >Previous</button>
                {/if}
            </li>
            {#each {length: totalPages} as _, i}
                {#if currentPage===i+1}
                    <li class="page-item"><button  on:click={(e)=>{currentPage=i+1}} data-testid="paginationButton" class="page-link active" >{i+1}</button></li>
                {:else}
                    <li class="page-item"><button  on:click={(e)=>{currentPage=i+1}} data-testid="paginationButton" class="page-link" >{i+1}</button></li>
                {/if}
            {/each}
            <li class="page-item">
                {#if currentPage < totalPages}
                    <button class="page-link" on:click={next}>Next</button>
                {:else}
                    <button class="page-link disabled" on:click={next}>Next</button>
                {/if}
            </li>
        </ul>
    </nav>
    
    <input type="input" placeholder="Search email" class="form-control form-control-lg" id="formFileLg" on:input={searchHandle}/> 

    {#each list as item (item.id) }

        <div data-testid="cards" class="card" style="margin-top: 10px;">
        <div class="card-body">
            <h5 class="card-title">Name: {item.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Email: {item.email}</h6>
            <p class="card-text">{item.body}</p>
        </div>
        </div>
        
    {/each}

</div>

