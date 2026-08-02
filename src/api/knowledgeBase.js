import axios from "axios"


const BASE_URL = "http://127.0.0.1:8000/knowledge_bases"


export async function getAllKnowledgeBases(){
    return await axios.get(
        `${BASE_URL}/all`
    )
}


export async function createKnowledgeBase(kbName){
    return await axios.post(
        `${BASE_URL}/`,
        {
            name: kbName
        }

    )
}


export async function getKnowledgeBase(kbName){
    return await axios.get(
        `${BASE_URL}/${kbName}`
    )
}


export async function deleteKnowledgeBase(kbName){
    return await axios.delete(
        `${BASE_URL}/${kbName}`
    )
}



