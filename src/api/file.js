import axios from "axios"


export async function getFileList(kbName){

    return await axios.get(
        "http://127.0.0.1:8000/files/files_message",
        {
            params:{
                kb_name:kbName
            }
        }
    )

}


export async function refreshFiles(store){

    const res =
    await getFileList(store.kbName)

    store.files =
    res.data.data.files

}