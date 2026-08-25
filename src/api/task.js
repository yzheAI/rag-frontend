import request from "./request"


export async function getTasks(){

    return await request.get(
        "/tasks/tasks"
    )

}