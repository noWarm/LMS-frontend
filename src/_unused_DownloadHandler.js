const downloadHandler = (materialId) => {
    axios({
        url: `http://127.0.0.1:8000/api/courses/${courseId}/materials/${materialId}`,
        method: "GET",
        // responseType: "blob",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        console.log(response.headers);
        const filename = response.headers["content-disposition"].match(/filename\s*=\s*(.+)/i)[1];
        console.log(filename);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download", 
            filename
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
    });
    console.log('inside download handler');
    console.log(token);
};