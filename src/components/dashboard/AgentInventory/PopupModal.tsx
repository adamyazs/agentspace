import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/shared/dialog";
import { MessageSquareMore } from "lucide-react";

export default function PopupModalProps({ title, value }: { title: string, value?: string }) {
    return (<>
        <Dialog>
            <DialogTrigger asChild>
                <button className="hover:text-primary flex items-center gap-1" title={title}>
                    <MessageSquareMore size={20} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {value || "No description available."}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    </>)
}