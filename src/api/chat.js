import request from "./request"


export function createConversation(kb_name){
    return request.post(
        "/chat/create_conversation",
        null,
        {
            params:{
                kb_name
            }
        }
    )
}


export function getConversations(kb_name){
    return request.get(
        "/chat/conversations",
        {
            params:{
                kb_name
            }
        }
    )
}


export function getMessages(conversation_id){

    return request.get(
        `/chat/messages/${conversation_id}`
    )

}


export function deleteConversation(conversation_id){

    return request.delete(
        `/chat/conversation/${conversation_id}`
    )

}