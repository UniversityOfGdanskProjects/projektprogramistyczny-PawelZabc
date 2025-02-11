'use client'
export default function DeleteButton({mapname}) {
  const handleDelete = async () => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    const response = await fetch(`/api/maps/${username}/${mapname}`, {
            method: "DELETE",
            headers: {
                Authorisation: `Bearer ${token}`
            }});
        if(response.ok){}
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}