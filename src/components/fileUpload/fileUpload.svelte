<script lang="ts">
	import axios from 'axios';

    let files:FileList;
    let outcome:string="";

    let uploadProgress:number=0;
    let style:string=""


    async function upload (event: HTMLFormElement) {
        event.preventDefault()

        const url = 'http://localhost:9000/api/list/';
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('fileName', files[0].name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
                onUploadProgress: (data:any) => {
                    uploadProgress=Math.round((data.loaded/data.total)*100)
                    style = "width: "+uploadProgress+"%"
                }
            
            };

            
            const response = await axios.post(url, formData, config)
            response.data.result?outcome="File uploaded successfully":outcome="Fail to upload"

    }


    $: console.log(outcome)
</script>




    
    <div class="card" style="width:50%; margin:auto; margin-top: 100px;" >
        <div class="card-body">
            <form >
                <h1>Upload A File</h1>
                <input data-testid="upload" type="file" class="form-control form-control-lg" id="formFileLg" bind:files/>
                <button data-testid="uploadButton" class="btn btn-dark" type="submit" on:click={upload}>Upload</button>
            </form>
            {#if uploadProgress===0}
                <div></div>
            {:else}
                <div class="progress" role="progressbar">
                    <div class="progress-bar" {style}>{uploadProgress}%</div>
                </div>
            {/if}
            <div><small data-testid="outcome">{outcome}</small></div>
        </div>
    </div>

