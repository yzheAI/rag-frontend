import request from "./request"


export async function getFileList(kbName){

    return await request.get(
        "/files/files_message",
        {
            params:{
                kb_name:kbName
            }
        }
    )

}
