import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from "./firebase.config"

export const uploadImg = async (file) => {
    const imgRef = ref(storage, `img/${v4()}`);

    const data = await uploadBytes(imgRef, file);
    console.log(data);


    const url = await getDownloadURL(data.ref);
    console.log(url);

    return url;
};

export const uploadPdf = async (file) => {
    const pdfRef = ref(storage, `pdf/${v4()}`)

    const data = await uploadBytes(pdfRef, file);
    console.log(data);

    const url = await getDownloadURL(data.ref);
    console.log(url);
    return url;
};
