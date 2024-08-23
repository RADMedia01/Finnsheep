// "use client"

import { fetchMessage } from "@/app/lib/data";

const ViewMessage = async({id}) => {
    const message = await fetchMessage(id);
  return (
    <div>{message._id}{message.name}</div>
  )
}

export default ViewMessage