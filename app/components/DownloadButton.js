'use client'
export default function DownloadButton({mapname}) {
  const handleDownload = async () => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    const response = await fetch(`/api/maps/${username}/${mapname}`, {
            method: "GET",
            headers: {
                Authorisation: `Bearer ${token}`
            }});
        if(response.ok){
            const file = await response.json()
            const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${mapname}.json`; // Filename for download
        a.click();
        URL.revokeObjectURL(url)
        }
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
}
