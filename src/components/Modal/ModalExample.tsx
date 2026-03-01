import { useState } from 'react';
import Modal from './Modal';
import './styles.scss';

export default function ModalExample() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="modal-demo">
            <h2>Interactive Modal Demo</h2>
            <p>
                Click the button below to open a modal dialog over the current page content.
            </p>
            <button
                className="modal-demo__trigger-btn"
                onClick={() => setIsModalOpen(true)}
            >
                Open Custom Modal
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Terms of Service"
            >
                <div className="modal-demo__content">
                    <h3>Welcome!</h3>
                    <p>
                        This is an example modal component built from scratch without using the
                        <code>&lt;dialog&gt;</code> HTML element. It centers itself both vertically and
                        horizontally, using a dark background overlay.
                    </p>
                    <p>
                        You can close it by clicking the 'x' button in the top right, pressing the
                        <strong> Escape </strong> key, or clicking outside the window on the dark overlay.
                    </p>
                    <button
                        className="cancel-btn"
                        onClick={() => setIsModalOpen(false)}
                    >
                        I Agree / Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}
