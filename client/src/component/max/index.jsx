import { useEffect, useState } from "react"
import ActivityModal from "./ActivityModal"
import { img } from "../../assets/assets"
import Modal from "../Modal/Modal"
import TimeModal from "./TimeModal"
import SetModal from "./SetModal"
import { useMax } from "../../context/useMax"
import { useNavigate } from 'react-router-dom';


export function Max() {
    const { active, setActive } = useMax();
    const [openMex, setOpenMex] = useState(false)
    const [modalIndex, setModal] = useState(null);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(active ? true : false)
    }, [active])
    const handleToggle = () => {
        setModal((prev) => prev === 0 ? null : 0)
        setOpenMex((prev) => !prev)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenMex(false);
        setModal(null);
        setActive(true);
        navigate('/');
    }


    const handleNext = () => {
        if (modalIndex < 1) {
            return setModal(modalIndex + 1);
        }
        setModal(modalIndex + 1);
    }


    return (
        <div
            className={`size-12 cursor-pointer rounded-md mr-2 bg-new-card border border-stroke ${openMex ? "z-50 bg-white/50 border border-body-text" : ""}`}
            onClick={!disabled ? handleToggle : undefined}
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