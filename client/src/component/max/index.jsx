import { useState } from "react"
import ActivityModal from "./ActivityModal"
import { img } from "../../assets/assets"
import Modal from "../Modal/Modal"
import TimeModal from "./TimeModal"
import SetModal from "./SetModal"
import { useMax } from "../context/useMax"


export function Max() {
    const { setActive } = useMax();
    const [openMex, setOpenMex] = useState(false)
    const [modalIndex, setModal] = useState(null);

    const handleToggle = () => {
        setModal((prev) => prev === 0 ? null : 0)
        setOpenMex((prev) => !prev)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenMex(false);
        setModal(null);
        setActive(true);
    }


    const handleNext = () => {
        if (modalIndex < 1) {
            return setModal(modalIndex + 1);
        }
        setModal(modalIndex + 1);
    }


    return (
        <div
            className={`w-12 h-12 cursor-pointer rounded-md mr-2 bg-new-card border border-stroke ${openMex ? "z-50 bg-white/50 border border-body-text" : ""}`}
            onClick={handleToggle}
        >
            <img className={`w-full h-full ${openMex && "z-50"}`} src={img.happy} alt="happy" />

            <Modal open={openMex} className={"-z-20"}>
                {modalIndex === 0 && openMex && <ActivityModal onSelect={handleNext} />}
                {(modalIndex === 1 && openMex && <TimeModal onSelect={handleNext} />)}
                {(modalIndex === 2 && openMex && <SetModal onSubmit={handleSubmit} />)}
            </Modal>
        </div>
    )
} 