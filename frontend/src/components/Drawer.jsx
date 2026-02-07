import { X } from 'lucide-react';
import { useEffect } from 'react';

const Drawer = ({
    isOpen,
    onClose,
    title,
    children,
}) => {

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-card border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out custom-scrollbar overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            aria-labelledby='drawer-label'
        >
            <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-white/5 p-6 flex items-center justify-between">
                <h2 id='drawer-label' className="text-xl font-display font-medium text-white">
                    {title || "Explanation"}
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-6 md:p-8">
                {children}
            </div>
        </div>
    );
}

export default Drawer;