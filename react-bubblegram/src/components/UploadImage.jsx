import { Box, Button, Container, Slider, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Storage, API, Auth } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { createPost } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";
import { LoadingButton } from "@mui/lab";

import Cropper from "react-easy-crop";

Storage.configure({ level: "public" });

export default function UploadImage({ setModal }) {
  const cropWidth = 320;
  const cropHeight = cropWidth;
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [inputs, setInputs] = useState({});
  const [user, setUser] = useState({});

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect] = useState(1);

  function onCropComplete(croppedArea, croppedAreaPixels) {
    setCroppedArea(croppedAreaPixels);
    showCroppedImage();
  }
  function handleChange(event) {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let status = await Auth.currentAuthenticatedUser();
        const allUsers = await API.graphql({ query: listUsers });
        const currentUser = allUsers.data.listUsers.items.find(
          (user) => user.username === status.attributes.nickname
        );
        setUser(currentUser);
      } catch (error) {
        console.error("error authenticating: ", error);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  async function onChange(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImageLoaded(true);
  }

  async function onSubmit() {
    setLoading(true);
    try {
      let object = await Storage.put(
        selectedFile.name,
        dataURItoBlob(croppedImage),
        {
          contentType: "image",
        }
      );

      console.log(user);
      const postDetails = {
        title: inputs.title,
        picture_url: object.key,
        likes: 0,
        userPostsId: user.id,
      };
      API.graphql({
        query: createPost,
        variables: { input: postDetails },
      }).then(() => {
        setLoading(false);
        setModal(false);
        setImageLoaded(false);
        setPreview(undefined);
        setSelectedFile(undefined);
        window.location.reload();
      });
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  }
  function cropImage(url, width, height, x, y, callback) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();

    // set canvas dimensions

    canvas.width = width;
    canvas.height = height;

    imageObj.onload = function () {
      context.drawImage(imageObj, x, y, width, height, 0, 0, width, height);
      callback(canvas.toDataURL());
    };

    imageObj.src = url;
  }

  function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  const showCroppedImage = useCallback(async () => {
    try {
      if (croppedArea) {
        cropImage(
          preview,
          croppedArea.width,
          croppedArea.height,
          croppedArea.x,
          croppedArea.y,
          (croppedImageTemp) => {
            setCroppedImage(croppedImageTemp);
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedArea, preview]);

  return (
    <Container maxWidth="xs" sx={{ my: 8 }}>
      {selectedFile && (
        <Box
          className="img-background"
          position="relative"
          width={cropWidth}
          height={cropHeight}
          sx={{ m: 4 }}
        >
          <Cropper
            image={preview}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropAreaChange={onCropComplete}
            onZoomChange={setZoom}
            onMediaLoaded={onCropComplete}
          />
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: "50%",
              transform: "translateX(-50%)",
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
        </Box>
      )}
      <TextField
        required
        name="title"
        label="Caption"
        autoComplete="off"
        variant="outlined"
        onChange={handleChange}
      />
      <Box>
        <Button variant="contained" component="label" sx={{ my: 1 }}>
          Choose picture
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={onChange}
            required
            hidden
          />
        </Button>
      </Box>
      <Box>
        <LoadingButton
          sx={{ my: 1 }}
          size="small"
          color="secondary"
          onClick={onSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<UploadIcon />}
          variant="contained"
          disabled={!croppedImage}
        >
          Upload
        </LoadingButton>
      </Box>
    </Container>
  );
}
