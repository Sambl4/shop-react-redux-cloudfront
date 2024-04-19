import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { AxiosError } from "axios";
import Context from "~/context/context";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const { setMsg } = useContext(Context);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    try{
      // Get the presigned URL
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file!.name),
        },
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      });
      console.log("File to upload: ", file!.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log("Result: ", result);
      // @ts-ignore
      setFile("");
    } catch (e: any) {
      const code = e.response.status;
      if ([401, 403].includes(code)) {
        setMsg(e.message)
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
