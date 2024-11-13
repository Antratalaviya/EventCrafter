import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase.config";

// Function to delete an image from Firebase Storage
export const deleteImg = async (imgUrl) => {
    try {
        // Create a reference to the file to delete
        const imgRef = ref(storage, imgUrl);

        // Delete the file
        await deleteObject(imgRef);
        console.log("img deleted successfully");

    } catch (error) {
        console.error("Error deleting image:", error);
    }
};

// Function to delete a PDF from Firebase Storage
export const deletePdf = async (pdfUrl) => {
    try {
        // Create a reference to the file to delete
        const pdfRef = ref(storage, pdfUrl);

        // Delete the file
        await deleteObject(pdfRef);
        console.log("PDF deleted successfully");
    } catch (error) {
        console.error("Error deleting PDF:", error);
    }
};
