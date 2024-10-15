
import { http, HttpResponse } from "msw";


type ItemType = {
    id:number,
    name:string,
    email:string,
    body:string
    }

type ListType =  ItemType[]


const resJsonGenerator = (csvLines: number, list:ListType, totalPages:number, pageSize:string ) =>{
    console.log(csvLines,list, totalPages, pageSize)
    if (pageSize){
        for(let i=0; i<csvLines;i++){

            list.push({
                id:i,
                name:"",
                email:"",
                body:""
            })

        }

        totalPages= Math.floor(csvLines/parseInt(pageSize))


        return { list, totalPages }

    }

    
} 



export const handlers = [
    http.post("http://localhost:9000/api/list", async ({request}) => {
        console.log('Handler', request.method, request.url);
        // const url = new URL(request.url)
        // console.log(url.toString())
        const test = await request.formData()
        console.log(test.get("fileName"))
        return HttpResponse.json({ result:"received" })
        
    }),
    http.options("http://localhost:9000/api/list", async ({request}) => {
        console.log('Handler', request.method, request.url)
        

        
        
    }),
    http.get("http://localhost:9000/api/list/get", async ({request}) => {
        const url = new URL(request.url)
        
        const pageSize =  url.searchParams.get('pageSize')

        let list:ListType=[]
        let totalPages=0
        
        let resJson
        if (pageSize){
            resJson = resJsonGenerator(500, list, totalPages, pageSize)
        }


        return HttpResponse.json(resJson)
    }),
    http.options("http://localhost:9000/api/list/get",  () => {
        

        
        
    }),
];